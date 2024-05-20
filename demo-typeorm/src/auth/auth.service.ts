import { ForbiddenException, Injectable } from '@nestjs/common';
// import { AuthDto } from './dto/auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import * as dto from './dto/index'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { EntityManager, Repository } from 'typeorm';
import { PasswordToken } from './entities/password-token.entity';
import { privateDecrypt } from 'crypto';


@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(PasswordToken)
    private tokenRepo: Repository<PasswordToken>
  ) {}

  async signup(authDto: dto.AuthDto): Promise<{}> {
    try {
      // generate pass to hashpass
      const hash = await argon2.hash(authDto.password);

      //save the new user in the db
      authDto.password = hash
      const user = await this.userService.create(authDto)
      console.log(user.id)
      return this.signToken(user.id, user.email);
    } catch (error) {
      throw error 
    }
    return {}
  }

  async signin(authDto: dto.AuthDto): Promise<{}> {
    
    //find you by email
    const user = await this.userService.findByEmail(authDto.email)


    //compare password
    const passMatches = await argon2.verify(user.pass, authDto.password)

    //if pass incorrect throw exception
    if(!passMatches){
      throw new ForbiddenException('password not correct')
    }

    return this.signToken(user.id, user.email)
  }

  async forgotPass(email: string): Promise<{}> {
    //find user
    const user = await this.userService.findByEmail(email)
    //if user not exist
    if(!user){
      throw new ForbiddenException('email not exist')
    }

    let data = await this.tokenRepo.findOne({
      where:{
        email: user.email
      }
    })
    console.log(data)

    if(!data){
      console.log('fuck')
      const token = Math.random().toString(20).substring(2,12)
      const expiredAt = new Date()
      expiredAt.setHours(expiredAt.getUTCHours(), expiredAt.getUTCMinutes() + 5)
      data = await this.tokenRepo.create({
        email: user.email,
        token,
        expiredAt,
        userId: user.id
      })
      await this.tokenRepo.save(data)
      delete data.createdAt
      delete data.updatedAt
      return data;
    }else{ // neu ton tai token
      console.log('fuck')
      const time = new Date()
      time.setHours(time.getUTCHours(), time.getUTCMinutes())
      // no expire
      if(data.expiredAt < time){
        const token = Math.random().toString(20).substring(2,12)
        const expiredAt = new Date()
        expiredAt.setHours(expiredAt.getUTCHours(), expiredAt.getUTCMinutes() + 1)
        data.token = token
        data.expiredAt = expiredAt
        await this.tokenRepo.save(data)
        delete data.createdAt
        delete data.updatedAt
        return data
      }else{
        delete data.createdAt
      delete data.updatedAt
        return data
      }
    }
    
    
  }

  async resetPass(newPass:string, mail: string, token: string){
    //find user
    const user = await this.userService.findByEmail(mail)
    if(!user){
      throw new ForbiddenException('email not exist')
    }
    //check token
    const check = await this.tokenRepo.findOne({
      where:{
        email: user.email
      }
    })
    if(check.token !== token){
        throw new ForbiddenException('incorrect token')
    }
    //check time token
    //do something ...
    
    // hash new pass
    const hash = await argon2.hash(newPass);
    user.pass = hash
    await this.userService.save(user)
    //delete token 
    await this.tokenRepo.delete({email: user.email})
    return user;
  }

  async changePass(oldPass: string, newPass:string, id: number) {
    //find user
    const user = await this.userService.findOne(id)
    //check old pass
    const passMatches = await argon2.verify(user.password, oldPass)
    //if pass incorrect throw exception
    if(!passMatches){
      throw new ForbiddenException('password not correct')
    }
    //hash new pass
    const newHash = await argon2.hash(newPass);
    user.password = newHash
    await this.entityManager.save(user)
    return this.userService.entityToAuthDto(user);
  }
  // //cách làm có cài đặt option cho jwt
  // async signToken(userId:number, email: string): Promise<{access_token: string}> {
  //   const payload = {
  //     sub: userId, 
  //     email
  //   }
  //   const secret = await this.config.get('JWT_SECRET')
  //   const token = await this.jwt.signAsync(payload, { 
  //     expiresIn: '120m', 
  //     secret: secret
  //   })
  //   return { access_token: token}
  // }

  //cách làm không có cài đặt option cho jwt
  async signToken(userId:number, email: string): Promise<{access_token: string}> {
    const payload = {
      sub: userId, 
      email
    }
    const token = await this.jwt.signAsync(payload)
    this.jwt.
    return { access_token: token }
  }


}

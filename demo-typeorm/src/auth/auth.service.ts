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


@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectEntityManager()
    private entityManager: EntityManager
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
    
    const token = Math.random().toString(20).substring(2,12)

    return {token, mail: user.email};
  }

  async resetPass(newPass:string, mail: string){
    //find user
    const user = await this.userService.findByEmail(mail)
    // hash new pass
    const hash = await argon2.hash(newPass);
    user.pass = hash
    await this.userService.save(user)
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

  async signToken(userId:number, email: string): Promise<{acess_token: string}> {
    const payload = {
      sub: userId, 
      email
    }
    const secret = await this.config.get('JWT_SECRET')
    const token = await this.jwt.signAsync(payload, { 
      expiresIn: '60m', 
      secret: secret
    })
    return { acess_token: token}
  }


}

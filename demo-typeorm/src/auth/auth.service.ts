import { ForbiddenException, Injectable } from '@nestjs/common';
// import { AuthDto } from './dto/auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import * as dto from './dto/index'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { UserService } from 'src/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService,
    private userService: UserService,
    @InjectRepository(User)
    private userRepo: Repository<User>
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
    // if user do not exist throw exception
    // if(!user){
    //   throw new ForbiddenException('email do not exist')
    // }

    //compare password
    const passMatches = await argon2.verify(user.pass, authDto.password)

    //if pass incorrect throw exception
    if(!passMatches){
      throw new ForbiddenException('password not correct')
    }

    return this.signToken(user.id, user.email)
  }

  async forgotPass(email: string, newPass: string) {
    //find user
    const user = await this.userService.findByEmail(email)
    console.log(user)
    //if user not exist
    if(!user){
      throw new ForbiddenException('email not exist')
    }
    // hash new pass
    const hash = await argon2.hash(newPass);
    //change new pass to authDTO
    // authDto.password = hash
    // update user pass
    user.pass = hash
    this.userRepo.save(user)
    return user;
  }

  changePass(pass: string) {
        // //check old pass
    // const passMatches = await argon2.verify(user.pass, authDto.password)
       //if pass incorrect throw exception
      //  if(!passMatches){
      //   throw new ForbiddenException('password not correct')
      // }
    return `This action updates a # auth`;
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

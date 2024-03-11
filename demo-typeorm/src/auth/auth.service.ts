import { ForbiddenException, Injectable } from '@nestjs/common';
// import { AuthDto } from './dto/auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import * as dto from './dto/index'
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';


@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    private config: ConfigService
  ) {}

  async signup(dto: dto.AuthDto): Promise<{}> {
    try {
      // generate pass to hashpass
      const hash = await argon2.hash(dto.password);

      //save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      throw error 
    }
  }

  async signin(dto: dto.AuthDto): Promise<{}> {
    
    //find you by email
    const user = await this.prisma.user.findUnique({
      where:{
        email: dto.email,
        // hash 
      }
    })

    // if user do not exist throw exception
    if(!user){
      throw new ForbiddenException('email do not exist')
    }

    //compare password
    const passMatches = await argon2.verify(user.hash, dto.password)

    //if pass incorrect throw exception
    if(!passMatches){
      throw new ForbiddenException('password not correct')
    }

    // delete user.hash
    return this.signToken(user.id, user.email); // when we return in async function, we dont need put 'async' in signToken function && we dont need use 'await' in this line because this is async function so it alway return promise 
  }

  forgotPass(id: string) {
    return `This action returns a #${id} auth`;
  }

  changePass(id: string) {
    return `This action updates a #${id} auth`;
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

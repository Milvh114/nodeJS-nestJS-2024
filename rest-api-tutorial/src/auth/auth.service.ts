import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { promises } from 'dns';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) { }

  async signup(dto: AuthDto): Promise<string> {
    try {
      // generate pass to hashpass
      const hash = await argon2.hash(dto.password);

      //save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
          // firstName:'Alice',
          // lastName:'minh'
        },
        // select: { // selcet can help you display fields u want respon to client
        //   email:true,
        //   firstName:true,
        //   lastName:true
        // }
      });
      //delete the field you dont want to show for client in respon
      // delete user.hash;
      // return the save user
      return this.signToken(user.id, user.email);// when we return in async function, we dont need put 'async' in signToken function
    } catch (error) {
      console.log(error.code)
      if(error instanceof PrismaClientKnownRequestError){
        if(error.code === "P2002") {// error code of prisma if have any error of prisma
          throw new ForbiddenException('Credentials taken')
        }
      }
      throw error // throw error not come from prisma
      // return { msg: `duplicate email: ${error}`};
    }
  }

  async signin(dto: AuthDto): Promise<string> {
    
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
    return this.signToken(user.id, user.email); // when we return in async function, we dont need put 'async' in signToken function
  }

  signToken(userId:number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email
    }
    const secret = this.config.get('JWT_SECRET')
    return this.jwt.signAsync(payload, {
      expiresIn: '15m', //this mean give that token to user, the user can do some action on our platform for 15 minute after that the user need sign in again
      secret: secret
    })
  }
}

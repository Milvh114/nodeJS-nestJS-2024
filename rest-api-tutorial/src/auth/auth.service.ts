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

  async signup(dto: AuthDto): Promise<{}> {
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
        // select: { // selcet can help you display fields u want response to client
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

  async signin(dto: AuthDto): Promise<{}> {
    
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

  async signToken(userId:number, email: string): Promise<{acess_token: string}> {//  we dont need put 'async' in signToken function bcs we dont use 'await' in this function but we  use promise<string> code will know this is promise
    const payload = {
      sub: userId, // we choose a property name of 'sub' to hold our 'userId' value to be consistent with JWT standards.
      email
    }
    const secret = await this.config.get('JWT_SECRET')
    const token = await this.jwt.signAsync(payload, { //a signAsync() function to generate our JWT from a subset of the user object properties, which we then return as a simple object with a single access_token property.
      expiresIn: '60m', //this mean give that token to user, the user can do some action on our platform for 15 minute after that the user need sign in again
      secret: secret
    })
    return { acess_token: token}
  }
}

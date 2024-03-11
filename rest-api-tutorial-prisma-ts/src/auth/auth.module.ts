import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategy';

@Module({
  imports:[JwtModule.register({})], // this is to sign in decode the JSON web token(JWT) 
  providers: [AuthService, JwtStrategy], // add provider JwtStrategy u can pprotect some of our routes with that strategy. Mean: u can access a route only if you have valid strategy
  controllers: [AuthController]
})
export class AuthModule {}


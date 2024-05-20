import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordToken } from './entities/password-token.entity';
import { jwtConstants } from './guard/constants';

@Module({
  imports:[
    // JwtModule.register({ global: true}), //cách khai báo không truyền vào option cho nó
    JwtModule.register({ //cách khai báo có truyền vào option cho nó
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120m' },
    }),
    UserModule, 
    TypeOrmModule.forFeature([PasswordToken]),
  ],
    
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
})
export class AuthModule {}

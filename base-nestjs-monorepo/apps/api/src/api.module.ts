import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, JwtModule.register({}), UserModule],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}

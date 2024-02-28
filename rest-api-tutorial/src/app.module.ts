import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

//root modules
@Module({
  imports: [AuthModule],
})
export class AppModule {}

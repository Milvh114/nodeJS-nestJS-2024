import { ConfigModule } from '@nestjs/config'; // module from nestjs && Config module is usually implemented on the root module

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';

//root modules
@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    AuthModule, PrismaModule,
    BookmarkModule,
    UserModule
  ],
})
export class AppModule {}

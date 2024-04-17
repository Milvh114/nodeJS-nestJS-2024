import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentService } from './comment/comment.service';
import { CommentModule } from './comment/comment.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    PostModule,
    CommentModule,
  ],
  // controllers: [],
  // providers: [],
})
export class AppModule {}
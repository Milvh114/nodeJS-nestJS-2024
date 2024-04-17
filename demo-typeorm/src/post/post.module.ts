import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { Post } from './entity/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Like } from './entity/like.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Post, Like])],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}

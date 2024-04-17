import { Body, Controller, Delete, HttpCode, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import * as dto from './dto/index';
import { PostService } from './post.service';
import { Request } from 'express';
import { User } from 'src/user/entities/user.entity';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

interface CustomRequest extends Request {
    user?: User;
}  

@UseGuards(JwtGuard)
@Controller('post')
export class PostController {
    constructor(
        private postService: PostService
    ){}

    @HttpCode(HttpStatus.OK)
    @Post('create-post')
    addPost(@Body() postDto: dto.PostDto, @Req() req: CustomRequest) {
        return this.postService.create(postDto, req.user);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('delete-post/:id')
    deletePost(@Param('id') id: number) {
        console.log(id)

        return this.postService.delete(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put('update-post/')
    updatePost(@Body() postDto: dto.PostDto, @Req() req: CustomRequest){
        return this.postService.update(postDto, req.user)
    }
    
    @HttpCode(HttpStatus.OK)
    @Post('like-post/:id')
    likePost(@Param('id') id: number, @Req() req: CustomRequest){//like phaan trang refresh token 
        return this.postService.addLike(id, req.user)
    }

}

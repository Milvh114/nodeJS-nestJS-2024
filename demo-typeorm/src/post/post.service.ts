import { ForbiddenException, Injectable } from '@nestjs/common';
import { Post } from './entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as dto from './dto/index';
import { User } from 'src/user/entities/user.entity';
import { Like } from './entity/like.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepo: Repository<Post>,
        @InjectRepository(Like)
        private likeRepo: Repository<Like>
    ){}

    async create(postDto: dto.PostDto, user: User): Promise<Post>{
        //create
        const post = this.postRepo.create({
            title: postDto.title,
            content: postDto.content,
            user: user
        })
        await this.postRepo.save(post)
        delete post.createdAt
        delete post.updatedAt
        return post
    }

    async update(postDto: dto.PostDto, user: User): Promise<Post>{
        //find post
        // const post = await this.postRepo.findOne({
        //     where:{
        //         id: postDto.id
        //     },
        //     relations:{user: true, likes= true}
        // })
        const post = await this.postRepo.createQueryBuilder("post")
        .leftJoinAndSelect("post.user", "user")
        .leftJoinAndSelect("post.likes", "likes")
        .leftJoinAndSelect("likes.user", 'user')
        .where("post.id = :id", { id: postDto.id })
        .getOne();

        console.log(post)
        //if not exist
        if(!post){
            throw new ForbiddenException('post is not exist')
        }

        //check user and user post
        if(user.id !== post.user.id){
            throw new ForbiddenException('u cant update this post')
        }
        //update post
        post.title = postDto.title
        post.content = postDto.content
        post.user = user
        await this.postRepo.save(post)
        return post
    }
    async delete(id: number): Promise<{post: Post, mess:string}>{
        //find post
        const post = await this.postRepo.findOne({
            where:{
                id
            }
        })
        console.log(post)
        //if not exist
        if(!post){
            throw new ForbiddenException('post is not exist')
        }
        //else remove
        await this.postRepo.remove(post)
        return {post, mess:"sucess"}
    }

    async addLike(id: number, user: User): Promise<{mess: string}>{
        //find post
        const post = await this.postRepo.findOne({
            where:{
                id: id
            },
            relations:['likes','user']
        })

        // const post = await this.postRepo.createQueryBuilder("post")
        // .leftJoinAndSelect("post.user", "user")
        // .leftJoinAndSelect("post.likes", "like")
        // .where("post.id = :id", { id: id })
        // .getOne();
        console.log(post)
        if(!post){
            throw new ForbiddenException('post is not exist')
        }
        const like = await this.likeRepo.create({
            postId: post.id,
            userId: user.id
        })

        const check = await this.likeRepo.findOne({where:{userId: user.id, postId: id}, relations:['user','post']})
        console.log("check:    ",check)
        if(!check){
            console.log("asd")
            post.likes.push(like)
            this.likeRepo.save(like)
            console.log(post.likes)
            //
            await this.postRepo.save(post)
            return {mess: "liked"}
        }
        await this.likeRepo.remove(check)
        post.likes = post.likes.filter(l => { return l !== check })
        console.log("zdf")  
        await this.postRepo.save(post)
        console.log("safd")
        return {mess: "unliked"}
    }

}

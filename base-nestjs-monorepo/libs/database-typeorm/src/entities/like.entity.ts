import { Comment } from "./comment.entity"
import User from "./User"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Post } from "./post.entity";


@Entity('like')
export class Like {
    @PrimaryGeneratedColumn('increment')
    id: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at'})
    updatedAt: Date;

    @Column({ name: "post_id" })
    postId: number

    @Column({ name: "user_id" })
    userId: number

    @ManyToOne(() => User, (user)=> user.id)
    @JoinColumn({name: 'user_id'})
    user: User

    @ManyToOne(() => Post, (post) =>{post.id})
    @JoinColumn({ name: 'post_id' })
    post: Post


}

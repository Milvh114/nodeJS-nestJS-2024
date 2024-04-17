import { Comment } from "src/comment/entity/comment.entity"
import { User } from "src/user/entities/user.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Post } from "./post.entity";


@Entity()
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

    @ManyToOne(() => User)
    @JoinColumn({name: 'user_id'})
    user: User

    @ManyToOne(() => Post)
    @JoinColumn({ name: 'post_id' })
    post: Post


}

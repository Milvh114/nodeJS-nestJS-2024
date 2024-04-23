import { Post } from "./post.entity"
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class Comment {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    content: string
    
    @Column()
    like: string

    // @ManyToOne(() => Post, (post) => post.comments)
    // post: Post
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at'})
    updatedAt: Date;

}

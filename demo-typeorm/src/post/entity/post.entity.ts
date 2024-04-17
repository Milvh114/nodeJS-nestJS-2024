import { Comment } from "src/comment/entity/comment.entity"
import { User } from "src/user/entities/user.entity"
import { AfterLoad, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Like } from "./like.entity"


@Entity()
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    title: string

    @Column()
    content: string

    @Column({ name: "user_id" })
    userId: string
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at'})
    updatedAt: Date;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[]

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User
    
    @OneToMany(() => Like, (like) => like.post)
    likes: Like[]

    // @Column({ default: 0 , name: 'total_likes'}) // Default value 0 for initial sum of likes
    // totalLikes: number;

    // @AfterLoad()
    // calculateTotalLikes() {
    //     this.totalLikes = this.likes ? this.likes.length : 0;
    // }
}

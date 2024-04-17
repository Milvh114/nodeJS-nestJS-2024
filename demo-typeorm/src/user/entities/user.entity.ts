import { Post } from "src/post/entity"
import { Like } from "src/post/entity/like.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    email: string

    @Column()
    password: string

    @Column({
        length: 100,
        name: 'name',
        nullable: true 
    })
    fullname: string

    @Column("text", {nullable: true })
    description: string
    
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at'})
    updatedAt: Date;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[]
}

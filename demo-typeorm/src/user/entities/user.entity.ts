import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
    
}

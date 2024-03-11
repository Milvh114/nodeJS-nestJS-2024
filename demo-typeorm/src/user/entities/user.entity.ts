import { Column, PrimaryGeneratedColumn } from "typeorm"

export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column()
    passworld: string

    @Column({
        length: 100,
        name: 'name'
    })
    fullname: string
    
}

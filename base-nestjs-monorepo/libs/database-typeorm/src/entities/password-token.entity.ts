
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "./User";

@Entity({name: 'password_tokens'})
export class PasswordToken {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({name: 'user_id'})
    userId: string

    @Column()
    token: string

    @Column({name: 'expire_at'})
    expiredAt: Date;

    @CreateDateColumn({name: 'create_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at'})
    updatedAt: Date;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({name: 'user_id'})
    user: User

}

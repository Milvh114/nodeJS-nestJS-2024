import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'password_tokens'})
export class PasswordToken {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    email: string

    @Column()
    token: string

    @Column({name: 'expire_at'})
    expiredAt: Date;

    @CreateDateColumn({name: 'create_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'update_at'})
    updatedAt: Date;

    @OneToOne(() => User)
    @JoinColumn({name: 'user_id'})
    userId: number

}

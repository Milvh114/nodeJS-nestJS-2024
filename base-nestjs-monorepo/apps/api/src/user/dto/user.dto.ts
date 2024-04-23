import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class UserDto {
    @IsNumber()
    @IsNotEmpty()
    id: number

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    pass: string

    @IsString()
    @IsNotEmpty()
    name: string

}

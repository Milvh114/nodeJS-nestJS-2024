import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsOptional()// can null
    fullName: string

    @IsString()
    @IsOptional()// can null
    description: string
}

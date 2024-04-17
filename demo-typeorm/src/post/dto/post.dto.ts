import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class PostDto {
    @IsNumber()
    @IsOptional()
    id: number

    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string

    

}

import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CommentDto {
    @IsNumber()
    @IsNotEmpty()
    content: number

    @IsNumber()
    @IsNotEmpty()
    like: number

    @IsNumber()
    @IsNotEmpty()
    postId: number

}

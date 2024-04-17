import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class DeletePostDto {

    @IsNumber()
    @IsNotEmpty()
    id: number

}

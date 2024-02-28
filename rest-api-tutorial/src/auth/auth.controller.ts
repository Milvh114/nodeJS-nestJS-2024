import { Body, Controller, ParseIntPipe, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto/index';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log(dto)
       return this.authService.signup()
    }
    @Post('signin')
    signin(@Body('email') email: string, @Body('pass', ParseIntPipe) pass: string){
        console.log({
            email,
            pass,
            typeemail: typeof email,
            typepass: typeof pass
        })
        return this.authService.signin()
    }
}

import { Body, Controller, Get, HttpCode, HttpStatus, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto/index';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    // Usually, when u create something new the HTTP status will return code (201 created) but u can make it return status code (200 OK)
    @HttpCode(HttpStatus.OK)
    @Post('signup')
    signup(@Body() dto: AuthDto){
        console.log(dto)
        return this.authService.signup(dto)
    }

    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() dto: AuthDto){
        
        return this.authService.signin(dto)
    }

    @Post('signin2')
    signin2(@Body('email') email: string, @Body('pass', ParseIntPipe) pass: string){
        console.log({
            email,
            pass,
            typeemail: typeof email,
            typepass: typeof pass
        })
        return {}
    }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthDto } from './dto/auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import * as dto from './dto/index'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('signup')
  signup(@Body() authDto: dto.AuthDto) {
    return this.authService.signup(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() authDto: dto.AuthDto) {
    return this.authService.signin(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-pass/:id')
  forgotPass(@Param('id') id: string,) {
    return this.authService.forgotPass(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('change-pass/:id')
  changePass(@Param('id') id: string,) {
    return this.authService.changePass(id);
  }

}

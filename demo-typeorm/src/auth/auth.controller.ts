import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpCode, HttpStatus, UseGuards, ForbiddenException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthDto } from './dto/auth.dto';
// import { UpdateAuthDto } from './dto/update-auth.dto';
import * as dto from './dto/index'
import { JwtGuard } from './guard/jwt.guard';
import { User } from 'src/user/entities/user.entity';


interface CustomRequest extends Request {
  user?: User; // Đặt kiểu cho thuộc tính user tùy theo thực thể người dùng của bạn
}

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
  @Post('forgot-pass')
  forgotPass(@Body('email') email: string) {
    return this.authService.forgotPass(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-pass')
  resetPass(@Body('email') email: string, @Body('newPass') newPass: string, @Body('newPass_confirm') newPass_confirm) {
    if(newPass !== newPass_confirm){
      throw new ForbiddenException('wrong confirm password')
    }
    return this.authService.resetPass(newPass, email);
  }

  @UseGuards(JwtGuard)
  @HttpCode(HttpStatus.OK)
  @Put('change-pass/:id')
  changePass(@Param('id') id: string, @Body('oldPass') oldPass:string, @Body('newPass') newPass, @Body('newPass_confirm') newPass_confirm, @Req() req: CustomRequest) {
    if(newPass !== newPass_confirm){
      throw new ForbiddenException('wrong confirm password')
    }
    return this.authService.changePass(oldPass, newPass, req.user.id);
  }

}

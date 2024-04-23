import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ForbiddenException, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import User from 'databaseTypeORM/database-typeorm/entities/User';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard } from '@app/core/guards/admin.guard';

// interface CustomRequest extends Request {
//   user?: User; // Đặt kiểu cho thuộc tính user tùy theo thực thể người dùng của bạn
// }

@ApiTags('Demo')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/signup')
  // @UseGuards(AdminGuard)
  @ApiConsumes('application/json')
  // @ApiBearerAuth()
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('forgot-pass')
  forgotPass(@Body('email') email: string) {
    return this.authService.forgotPass(email);
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-pass')
  resetPass(@Body('email') email: string, @Body('newPass') newPass: string, @Body('newPass_confirm') newPass_confirm, @Body('token') token: string) {
    if(newPass !== newPass_confirm){
      throw new ForbiddenException('wrong confirm password')
    }
    return this.authService.resetPass(newPass, email, token);
  }

  // @UseGuards(JwtGuard)
  // @HttpCode(HttpStatus.OK)
  // @Put('change-pass/:id')
  // changePass(@Param('id') id: string, @Body('oldPass') oldPass:string, @Body('newPass') newPass, @Body('newPass_confirm') newPass_confirm, @Req() req: CustomRequest) {
  //   if(newPass !== newPass_confirm){
  //     throw new ForbiddenException('wrong confirm password')
  //   }
  //   return this.authService.changePass(oldPass, newPass, req.user.id);
  // }
  
}

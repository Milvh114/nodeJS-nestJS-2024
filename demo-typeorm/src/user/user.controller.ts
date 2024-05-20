import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser, GetUserEmail } from 'src/auth/decorator';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
// import { Request } from 'express';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { AuthGuard } from 'src/auth/guard/auth.guard';

// interface CustomRequest extends Request {
//   user?: User;
// }


// @UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // cách dùng có express cần định nghĩa user trong request mới gọi tới được thằng user trong header. dài dòng 
  // @UseGuards(JwtGuard)
  // @Get('me')
  // getProfile(@Req() req: CustomRequest){ 
  //   const user: User = req.user
  //   console.log(user)
  //   return req.user
  // }

  // // cách không có express
    // @UseGuards(JwtGuard)
  // @Roles(['admin'])
  // @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req){ 
    return req.user
  }

  // // cách dùng decorator
  // @Get('me')
  // getProfile(@GetUser() user: User){ // type User come from prisma user's model
  //     return user
  // }

  // @Post()
  // create(@Body() userDto: UserDto) {
  //   return this.userService.create(userDto);
  // }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

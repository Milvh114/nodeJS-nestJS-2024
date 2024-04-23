import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

import { GetUser } from '../auth/decorator';

import { Request } from 'express';
import User from 'databaseTypeORM/database-typeorm/entities/User';
import { JwtGuard } from '../auth/guard/jwt.guard';

interface CustomRequest extends Request {
  user?: User;
}

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getProfile(@Req() req: CustomRequest){ 
    const user: User = req.user
    console.log(user)
    return user
  }
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

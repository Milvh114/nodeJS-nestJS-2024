import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser, GetUserEmail } from 'src/auth/decorator';
import { User } from './entities/user.entity';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { Request } from 'express';

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
    const user: User = req.user as  User
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

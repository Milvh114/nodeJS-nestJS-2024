import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import User from 'databaseTypeORM/database-typeorm/entities/User';
import { AuthDto } from '../auth/dto';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}


  async create(authDto: AuthDto): Promise<UserDto> {
    //check user exit
    let user = await this.userRepo.findOne({
      where:{
        email: authDto.email
      }
    })
    //if not create new one
    if(user){
      throw new ForbiddenException('email already exist')
    }
    // else throw error
    user = await this.userRepo.create({
      email: authDto.email,
      password: authDto.password,
      name: authDto.name
    })
    await this.userRepo.save(user)
    return this.entityToAuthDto(user);
  }

  async findByEmail(email: string): Promise<UserDto> {
    const user = await this.userRepo.findOne({
      where:{
        email
      }
    })
    if(!user){
      throw new ForbiddenException("email not exist")
    }
    return this.entityToAuthDto(user);
  }

  
  async update(oldDto: UserDto, newDto: AuthDto): Promise<UserDto> {
    oldDto.email = newDto.email
    oldDto.name = newDto.name
    oldDto.pass = newDto.password
    await this.userRepo.save(oldDto)
    return oldDto;
  }

  async save(userDto: UserDto): Promise<UserDto> {
    const user = await this.userRepo.findOne({
      where:{
        email: userDto.email
      }
    })
    user.email = userDto.email
    user.name = userDto.name
    user.id = userDto.id
    user.password = userDto.pass
    await this.userRepo.save(user)
    return userDto;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne({
      where:{
        id
      }
    })
    if(!user){
      throw new ForbiddenException("user not exist")
    }
    return user;
  }
  
  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  entityToAuthDto(user: User){
    const userDto = new UserDto()
    userDto.email = user.email
    userDto.name = user.name
    userDto.id = user.id
    userDto.pass = user.password
    return userDto
  }
}

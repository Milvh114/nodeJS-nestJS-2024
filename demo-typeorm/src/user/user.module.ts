import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])], //forFeature() method to define which repositories are registered in the current scope. // we can inject the UsersRepository into the UsersService using the @InjectRepository() decorator:
  controllers: [UserController],
  providers: [UserService],
  exports:[TypeOrmModule] // Thuộc tính này xác định các phần của module nào sẽ được truy cập từ các module khác. Trong trường hợp này, nó xuất TypeOrmModule, điều này có nghĩa là các module khác import UserModule cũng sẽ có quyền truy cập vào các tính năng TypeORM được cấu hình trong module này.
})
export class UserModule {}

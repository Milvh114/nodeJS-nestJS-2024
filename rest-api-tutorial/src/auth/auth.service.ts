import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    //generate pass to hashpass
    try {
        const hashpass = await argon2.hash(JSON.parse(dto.password));
    } catch (error) {

    }

    return { msg: 'i have signed up' };
  }

  signin() {
    return { msg: 'i have signed in' };
  }
}

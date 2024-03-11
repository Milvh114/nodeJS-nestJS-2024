import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser, GetUserEmail } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard) // u can move guard to controller for optimize code/logic 
                    // => It mean: guard will require you to be to have a token, guard will require you to provide an indentity of who you are
                    // => all api in this controller will be check by guard
@Controller('user')
export class UserController {

    // @UseGuards(AuthGuard('stop')) // AuthGuard('stop') => 'stop' will link to jwt strategy have name 'stop' => this route should be protected by jwt-strategy => need validate
    // @Get('me')
    // getProfile(@Req() req: Request){
    //     console.log({
    //         user: req // we can get authorized user in request in controller bcs when you validate the identity of a user(it mean 'payload' in jwt.strategy.ts file), its idenity can be appended to the request object
    //     })
    //     return req.user
    // }

    // @UseGuards(JwtGuard) // now JwtGuard extend AuthGuard('stop') // this route protected by strategy => if API(route) have guard, it will call guard 1st to check strategy should use for this api
    @Get('me')
    getProfile(@GetUser() user: User){ // type User come from prisma user's model
        return user
    }

    @Get('me/email')
    getMyEmail(@GetUserEmail('email') email: string){ 
        return email
    }

    @Patch()
    editUser() {
        
    }
}

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy( 
    Strategy, 
    'jwt' // default name strategy is 'jwt'
) {
    constructor( 
        config: ConfigService,
        @InjectRepository(User)
        private userRepo: Repository<User>
        ){
        super({// tuỳ chỉnh cấu hình // super must be call before anything
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // default false
            secretOrKey: config.get('JWT_SECRET')
        })
    }
    // passport giúp ta tự verifyAsync() token cho chúng ta
    async validate(payload: {sub: number, email: string}){ // this function will transformed token into that object and put into payload
        const user = await this.userRepo.findOne({
            where:{
                id: payload.sub
            }
        })
        delete user.password
        return user
    }

}

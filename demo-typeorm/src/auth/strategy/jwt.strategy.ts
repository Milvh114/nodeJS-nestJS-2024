import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy( 
    Strategy, 
    'jwt' // default name strategy is 'jwt'
) {
    constructor( config: ConfigService){
        super({// tuỳ chỉnh cấu hình // super must be call before anything
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // default false
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload: {sub: number, email: string}){ // this function will transformed token into that object and put into payload

        // const user = await this.prisma.user.findUnique({
        //     where:{
        //         id: payload.sub
        //     }
        // })
        // delete user.hash
        return  'hi'
    }
}

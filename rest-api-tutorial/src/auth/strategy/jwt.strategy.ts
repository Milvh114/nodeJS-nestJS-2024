/**
 *  Để cấu hình Strategy  bằng cách cung cấp hai thứ:
 *      1. Một tập hợp các tùy chọn dành riêng cho chiến lược đó
 *      2."Xác minh cuộc gọi lại". Tại đây, bạn xác minh xem người dùng có tồn tại hay không (và/hoặc tạo người dùng mới) và liệu thông tin đăng nhập của họ có hợp lệ hay không.
 *      Thư viện Passport hy vọng cuộc gọi lại này sẽ trả về một người dùng đầy đủ nếu xác thực thành công hoặc null nếu không thành công
 *  Nôm na:
 *      Với @nestjs/passport, bạn định cấu hình chiến lược Passport bằng cách mở rộng PassportStrategylớp. 
 *      Bạn chuyển các tùy chọn strategy (mục 1 ở trên) bằng cách gọi phương thức super() trong lớp con của bạn, tùy ý chuyển vào một đối tượng tùy chọn. 
 *      Bạn cung cấp lệnh gọi lại xác minh (mục 2 ở trên) bằng cách triển khai một validate()phương thức trong lớp con của bạn.
 */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { config } from "process";
import { PrismaService } from "src/prisma/prisma.service";


//JwtStrategy là một chiến lược để xác thực người dùng bằng JWT. Có nghĩa là bạn sẽ kiểm tra và giải mã JWT được gửi trong header tiêu đề Authorization của các yêu cầu đến ứng dụng của bạn.
@Injectable()
export class JwtStrategy extends PassportStrategy( // JwtStrategy được kế thừa thằng cha PassportStrategy. Nên đối với mỗi strategies, Passport sẽ gọi function validate-(hàm xác minh) (được triển khai bằng function validate() trong @nestjs/passport) bằng cách sử dụng một bộ tham số dành riêng cho chiến lược thích hợp. 
    Strategy, 
    'stop' // default name strategy is 'jwt'
) { // this class to decode token and protect request && pass request // if want u can have strategy for facebook or strategy for google
    constructor( config: ConfigService, private prisma: PrismaService){
        super({// tuỳ chỉnh cấu hình // super must be call before anything
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // default false
            secretOrKey: config.get('JWT_SECRET')
        })
    }

    async validate(payload: {sub: number, email: string}){ // this function will transformed token into that object and put into payload
        // console.log({
        //     payload,
        // })

        const user = await this.prisma.user.findUnique({
            where:{
                id: payload.sub
            }
        })
        delete user.hash
        return  user // return the user in JSON format 
        //by return the payload is going to append the payload to the user object of the request object
        // go to user controller for more information
    }
}

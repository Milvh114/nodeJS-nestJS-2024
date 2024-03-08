import { AuthGuard } from "@nestjs/passport";

export class JwtGuard extends AuthGuard('stop'){
    constructor(){
        super({
            
        });
    }
}
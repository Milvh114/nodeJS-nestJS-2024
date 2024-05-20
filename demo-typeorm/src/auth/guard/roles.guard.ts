import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles } from '../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     // console.log(context.user)
//     return true;
//   }

    constructor(private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean {
        console.log('sdm')
        console.log(context.switchToHttp().getRequest())
        // const roles = this.reflector.get(Roles, context.getHandler());
        const roles = this.reflector.get(Roles, context.getClass());
        // console.log(roles)
        if (!roles) {
        return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        // return roles == user.roles? true: false;
        return true;
    }
}

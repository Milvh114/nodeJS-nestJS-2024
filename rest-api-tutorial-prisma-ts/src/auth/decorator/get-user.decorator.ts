import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//NestJS is an abstraction. It mean NestJS uses something under the hood. Maybe it can use Express, it can use ant other protocol. 
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext/** It get the execution context of request */) => { 
    // Here, we say that the this execution context switch to HTTP bcs we're using HTTP, but sometimes u might use for instance WebSockets || u can use RPC for something like micro service
    const request: Express.Request = ctx.switchToHttp().getRequest(); // in this case, we use HTTP. So u can use function 'getRequest()' to do something, u can get response as well by use function 'getResponse()'
    return request.user;
  },
);

export const GetUserEmail = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => { 
    const request: Express.Request = ctx.switchToHttp().getRequest(); 

    // if have something in data we return request.user[data] instead request.user.data 
     // Example: if we call @GetUserId('email'). Now we already transmisson argument 'email' to decorator GetUserId now data return will be request.user.email
     // Otherwise, if we dont put any argument to this decorator this decorator will return user object(return all field of user)
    if(data){
      return request.user[data]
    }
    return request.user;
  },
);
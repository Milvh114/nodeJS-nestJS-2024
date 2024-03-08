import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//NestJS is an abstraction. It mean NestJS uses something under the hood. Maybe it can use Express, it can use ant other protocol. 
export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext/** It get the execution context of request */) => { 
    // Here, we say that the this execution context switch to HTTP bcs we're using HTTP, but sometimes u might use for instance WebSockets || u can use RPC for something like micro service
    const request: Express.Request = ctx.switchToHttp().getRequest(); // in this case, we use HTTP. So u can use function 'getRequest()' to do something, u can get response as well by use function 'getResponse()'
    return request.user;
  },
);
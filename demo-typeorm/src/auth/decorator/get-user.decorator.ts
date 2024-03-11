import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => { 
    const request: Express.Request = ctx.switchToHttp().getRequest();
    return request;
  },
);

export const GetUserEmail = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => { 
    const request: Express.Request = ctx.switchToHttp().getRequest(); 
    if(data){
      return request[data]
    }
    return request;
  },
);
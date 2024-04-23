import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequest } from '@app/jwt/types/payload.interface';

export const Sales = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request: IRequest = ctx.switchToHttp().getRequest();
  return request.admin;
});

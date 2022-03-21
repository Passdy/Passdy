import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import jwtDecode from 'jwt-decode';

export const UserID = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    try {
      const token = request.headers.authorization;
      const payload: {
        username: string;
        sub: number;
        exp: number;
      } = jwtDecode(token);
      return payload.sub;
    } catch (e) {
      throw new HttpException(
        { key: 'INVALID_ACCESS_TOKEN' },
        HttpStatus.BAD_REQUEST,
      );
    }
  },
);

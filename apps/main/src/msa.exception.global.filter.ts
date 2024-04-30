import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';

// 타입추론이 안되어서 인터페이스 생성
interface ICustomException {
  response?: {
    message?: string;
    error?: string;
    statusCode?: number;
  };
}

@Catch()
export class MSAExceptionFilter implements ExceptionFilter {
  catch(exception: ICustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception?.response?.statusCode;
    const errorBody = exception?.response;
    // console.log('status', status);
    // console.log('errorBody', errorBody);
    console.log('Exception', exception);
    if (status && errorBody) {
      return response.status(status).json(errorBody);
    } else {
      return response.status(500).json({
        message: '알 수 없는 오류가 발생하였습니다.',
        error: 'Internal Server',
        statusCode: 500,
      });
    }
  }
}

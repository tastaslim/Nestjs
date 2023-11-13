import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { IException } from '../interface/error.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const appResponse = exception.getResponse() as IException;
    response.status(status).json({
      isSuccess: appResponse.isSuccess,
      statusCode: appResponse.statusCode,
      data: appResponse.data,
      message: appResponse.message,
    });
  }
}

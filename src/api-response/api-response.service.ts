import {
  Injectable,
  HttpStatus,
  ForbiddenException,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { IUser } from '../interface/user.interface';

@Injectable()
export class ApiResponseService {
  private apiResponse(
    isSuccess: boolean = false,
    statusCode: HttpStatus = 500,
    data: any = {},
    message: string | string[] = '',
  ) {
    return { isSuccess, statusCode, data, message };
  }
  public SUCCESS(data: IUser | IUser[]) {
    return this.apiResponse(
      true,
      HttpStatus.OK,
      data instanceof Array ? { size: data.length, result: data } : data,
    );
  }
  public FORBIDDEN(message: string) {
    const forbiddenError = this.apiResponse(
      false,
      HttpStatus.FORBIDDEN,
      {},
      message || 'Forbidden',
    );
    throw new ForbiddenException(forbiddenError);
  }
  public BAD_REQUEST(message: string | string[]) {
    const badRequestError = this.apiResponse(
      false,
      HttpStatus.BAD_REQUEST,
      {},
      message || 'Bad Request',
    );
    throw new BadRequestException(badRequestError);
  }

  public static INVALID_CLIENT(message: string | string[]) {
    const invalidClientError = {
      isSuccess: false,
      statusCode: HttpStatus.BAD_REQUEST,
      data: {},
      message: message || 'Bad Request',
    };
    throw new BadRequestException(invalidClientError);
  }
  public UNAUTHORIZED(message: string) {
    const unauthorizedError = this.apiResponse(
      false,
      HttpStatus.UNAUTHORIZED,
      {},
      message || 'Unauthorized',
    );
    throw new UnauthorizedException(unauthorizedError);
  }
  public NOTFOUND(message: string) {
    const notFoundError = this.apiResponse(
      false,
      HttpStatus.NOT_FOUND,
      {},
      message || 'Not Found',
    );
    throw new NotFoundException(notFoundError);
  }
  public SERVER_ERROR(message: string) {
    const serverError = this.apiResponse(
      false,
      HttpStatus.INTERNAL_SERVER_ERROR,
      {},
      message || 'An unknown exception occurred. Please contact support',
    );
    throw new InternalServerErrorException(serverError);
  }
  public REQUEST_LIMIT_EXCEEDED(message: string) {
    const limitExceededError = this.apiResponse(
      false,
      HttpStatus.BAD_REQUEST,
      {},
      message || 'Request Limit Exceeded',
    );
    throw new BadRequestException(limitExceededError);
  }
  public MALFORMED_QUERY(message: string) {
    const malformedQueryError = this.apiResponse(
      false,
      HttpStatus.BAD_REQUEST,
      {},
      message || 'Query is malformed. Please correct your query and try again',
    );
    throw new BadRequestException(malformedQueryError);
  }
  public INVALID_FIELD(message: string) {
    const invalidFieldError = this.apiResponse(
      false,
      HttpStatus.BAD_REQUEST,
      {},
      message || 'Queried field is invalid',
    );

    throw new BadRequestException(invalidFieldError);
  }
  public INVALID_QUERY_FILTER_OPERATOR(message: string) {
    const invalidFilterError = this.apiResponse(
      false,
      HttpStatus.BAD_REQUEST,
      {},
      message || 'Invalid filter on query',
    );
    throw new BadRequestException(invalidFilterError);
  }
  public INVALID_TYPE_FOR_OPERATION(message: string) {
    const invalidTypeError = this.apiResponse(
      false,
      HttpStatus.BAD_REQUEST,
      {},
      message || 'Invalid type',
    );
    throw new BadRequestException(invalidTypeError);
  }
}

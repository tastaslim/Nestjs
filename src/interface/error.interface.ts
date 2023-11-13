import { HttpStatus } from '@nestjs/common';

export interface IException {
  isSuccess: boolean;
  statusCode: HttpStatus;
  data: any;
  message: string | string[];
}

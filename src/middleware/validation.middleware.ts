import { PipeTransform } from '@nestjs/common';
import { ObjectSchema } from 'joi';
import { ApiResponseService } from '../api-response/api-response.service';

export class ValidatorPipe<Dto> implements PipeTransform<Dto> {
  constructor(private schema: ObjectSchema<Dto>) {}
  public transform(value: Dto): Dto {
    const result = this.schema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((err) => err.message);
      throw ApiResponseService.INVALID_CLIENT(errorMessages);
    }
    return value;
  }
}

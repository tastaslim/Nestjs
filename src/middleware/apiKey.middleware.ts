import { ApiResponseService } from '../api-response/api-response.service';
import { Request, Response, NextFunction } from 'express';
import { allowedUriPathsApiKey } from '../config/environment.config';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { log } from 'console';
import { isValidGuid } from '../util/validator.util';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  constructor(private readonly apiResponseService: ApiResponseService) {}
  use(req: Request, res: Response, next: NextFunction) {
    if (allowedUriPathsApiKey.includes(req.path)) {
      return next();
    }
    const apiKeyFromRequest = req.headers['x-api-key'] as string;
    const isValidId = isValidGuid(apiKeyFromRequest);
    if (
      !apiKeyFromRequest ||
      !isValidId ||
      apiKeyFromRequest !== process.env.API_KEY
    ) {
      log(`Path(${req.path}) | IP(${req.ip}) | Message(Missing api key)`);
      throw this.apiResponseService.UNAUTHORIZED('UnAuthorized Client');
    }
    return next();
  }
}

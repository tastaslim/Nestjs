import { LoginUserSchema } from '../../middleware/schema/user.schema';
import { ValidatorPipe } from '../../middleware/validation.middleware';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { LoginUserDTO } from '../user/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidatorPipe<LoginUserDTO>(LoginUserSchema))
  @Post('/login')
  async login(@Body() user: LoginUserDTO) {
    return this.authService.login(user);
  }
}

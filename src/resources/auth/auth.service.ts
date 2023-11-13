import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDTO } from '../user/dto/user.dto';
import { Role } from 'src/interface/role.enum';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET_KEY,
    });
  }

  async login(user: LoginUserDTO) {
    // Get Role of user based on username from DB and put it inside payload
    const roles = [Role.ADMIN]; // pgService.getUserRole(user.username);
    const payload = { username: user.username, sub: user.password, roles };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

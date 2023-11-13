import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { ApiResponseModule } from '../../api-response/api-response.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ApiResponseModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

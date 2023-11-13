import { UserService } from './user.service';
import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Body,
  UsePipes,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  CreateUserSchema,
  UpdateUserSchema,
} from '../../middleware/schema/user.schema';
import { ValidatorPipe } from '../../middleware/validation.middleware';
import { CreateUserDTO, UpdateUserDTO } from './dto/user.dto';
import { ApiResponse } from '@nestjs/swagger';
import { IUser } from '../../interface/user.interface';
import { IException } from '../../interface/error.interface';
import { version } from '../../config/environment.config';
import { ApiResponseService } from '../../api-response/api-response.service';
import { AuthGuard } from '../../guard/auth/auth.guard';
import { Roles } from '../../guard/role/roles.decorator';
import { Role } from '../../interface/role.enum';
import { RolesGuard } from '../../guard/role/role.guard';

@UseGuards(AuthGuard)
@Controller(`/${version}/users`)
export class UserController {
  // Nest.js will provide me the object of userService.
  constructor(
    private readonly userService: UserService,
    private readonly apiResponseService: ApiResponseService,
  ) {}
  @Get()
  async listUsers(): Promise<Array<IUser> | IException> {
    try {
      const data = await this.userService.listUsers();
      return this.apiResponseService.SUCCESS(data);
    } catch (error) {
      throw this.apiResponseService.SERVER_ERROR(error.message);
    }
  }

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/practice')
  async practice() {
    /*
     SELECT u.id, u.name FROM public.users u WHERE u.id > 1 AND u.name LIKE '%Tas%'
     ORDER BY u.id DESC LIMIT 2 OFFSET 1
    */
    const data = await this.userService.practice();
    return this.apiResponseService.SUCCESS(data);
  }
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get(':id')
  // The ParseIntPipe will be used to convert id to number. Because from endpoint id would be coming as string
  async getUser(
    @Param('id', ParseIntPipe) user_id: number,
  ): Promise<IUser | IException> {
    try {
      const user = await this.userService.getUser(user_id);
      if (!user) {
        throw this.apiResponseService.NOTFOUND(
          `UserId ${user_id} does not exist`,
        );
      }
      return this.apiResponseService.SUCCESS(user);
    } catch (error) {
      if (error.status == 404) throw error;
      throw this.apiResponseService.SERVER_ERROR(error.message);
    }
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @Roles(Role.ADMIN)
  @UsePipes(new ValidatorPipe<CreateUserDTO>(CreateUserSchema))
  @UseGuards(RolesGuard)
  async createUser(@Body() user: CreateUserDTO): Promise<CreateUserDTO> {
    return await this.userService.createUser(user);
  }

  @Patch(':id')
  @UsePipes(new ValidatorPipe<UpdateUserDTO>(UpdateUserSchema))
  @Roles(Role.ADMIN)
  async updateUser(
    @Body() user: UpdateUserDTO,
    @Param('id', ParseIntPipe) user_id: number,
  ) {
    const { id } = await this.userService.getUser(user_id);
    if (!id) {
      return {
        id: id,
        message: 'User not found',
      };
    }
    return await this.userService.updateUser(user_id, user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async deleteUser(@Param('id', ParseIntPipe) user_id: number) {
    return await this.userService.deleteUser(user_id);
  }
}

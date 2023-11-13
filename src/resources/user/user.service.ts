import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Like, MoreThan, Repository, UpdateResult } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from 'src/resources/user/dto/user.dto';
import { IUser } from '../../interface/user.interface';
import { log } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async listUsers() {
    try {
      return this.userRepository.find();
    } catch (err) {
      log(err);
    }
  }

  async practice(): Promise<Array<IUser>> {
    /*
     SELECT u.id, u.name FROM public.users u WHERE u.id > 1 AND u.name LIKE '%Tas%'
     ORDER BY u.id DESC LIMIT 2 OFFSET 1
    */
    return await this.userRepository.find({
      where: {
        id: MoreThan(1),
        name: Like('%Tas%'),
      },
      select: ['id', 'name'],
      cache: 60000, // Caches query result for 60 sec
      take: 2,
      order: {
        id: 'DESC',
      },
      skip: 1,
    });
  }

  async getUser(id: number): Promise<IUser> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async createUser(user: CreateUserDTO): Promise<IUser> {
    return await this.userRepository.save(user);
  }

  async updateUser(
    id: number,
    user: UpdateUserDTO,
  ): Promise<UpdateResult | NotFoundException> {
    const user_info = await this.getUser(id);
    if (!user_info) {
      return new NotFoundException({
        id: id,
        message: 'User not found',
      });
    }
    return await this.userRepository.update(user_info.id, user);
  }

  async deleteUser(id: number): Promise<any> {
    try {
      const result = await this.userRepository.delete(id);
      if (result && result.affected && result.affected > 0) {
        return {
          id,
          message: 'User deleted successfully',
        };
      }
    } catch (err) {
      log(err);
      return new InternalServerErrorException();
    }
  }
}

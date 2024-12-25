import { Repository } from 'typeorm';
import { UserEntity } from 'src/Database/Entities/user.entity';
import { IUserRepository } from 'src/Modules/Users/Interfaces/i.user.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async getByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOne({
      where: { email },
      relations: ['role'],
    });
    return user;
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.repository.save(user);
  }
}

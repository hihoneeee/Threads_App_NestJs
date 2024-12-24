import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from 'src/Database/Entities/user.entity';
import { IUserRepository } from 'src/Modules/Users/Interfaces/i.user.repository';

@EntityRepository(UserEntity)
export class UserRepository
  extends Repository<UserEntity>
  implements IUserRepository
{
  async getByEmail(email: string): Promise<UserEntity | null> {
    return await this.findOne({ where: { email } });
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    return await this.save(user);
  }
}

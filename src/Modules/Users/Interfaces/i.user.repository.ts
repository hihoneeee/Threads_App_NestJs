import { UserEntity } from 'src/Database/Entities/user.entity';

export interface IUserRepository {
  getByEmail(email: string): Promise<UserEntity | null>;
  getUserById(id: number): Promise<UserEntity | null>;
  createUser(user: UserEntity): Promise<UserEntity>;
}

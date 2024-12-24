import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('followers')
export class FollowerEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  user_id: number;
  @ManyToOne(() => UserEntity, (user) => user.followers)
  follower: UserEntity;

  @CreateDateColumn()
  created_at: Date;
}

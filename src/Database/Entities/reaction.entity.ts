import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PostDetailEntity } from 'src/Database/Entities/post-detail.entity';

@Entity('reactions')
export class ReactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostDetailEntity, (postDetail) => postDetail.reactions)
  postDetail: PostDetailEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;
}

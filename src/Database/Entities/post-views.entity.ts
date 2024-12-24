import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PostDetailEntity } from 'src/Database/Entities/post-detail.entity';

@Entity('postViews')
export class PostViewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PostDetailEntity, (postDetail) => postDetail.views)
  postDetail: PostDetailEntity;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;
}

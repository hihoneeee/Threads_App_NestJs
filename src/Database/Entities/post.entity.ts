import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PostDetailEntity } from 'src/Database/Entities/post-detail.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  user: UserEntity;

  @OneToOne(() => PostDetailEntity, (postDetail) => postDetail.post, {
    onDelete: 'CASCADE',
  })
  postDetail: PostDetailEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

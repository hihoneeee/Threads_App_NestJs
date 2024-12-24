import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { PostDetailEntity } from 'src/Database/Entities/post-detail.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  images: string;

  @ManyToOne(() => PostDetailEntity, (postDetail) => postDetail.comments)
  postDetail: PostDetailEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

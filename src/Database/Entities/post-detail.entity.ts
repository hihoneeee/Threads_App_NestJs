import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { PostEntity } from './post.entity';
import { CommentEntity } from 'src/Database/Entities/comment.entity';
import { ReactionEntity } from 'src/Database/Entities/reaction.entity';
import { ReupEntity } from 'src/Database/Entities/reup.entity';
import { PostViewsEntity } from 'src/Database/Entities/post-views.entity';

@Entity('postDetail')
export class PostDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ nullable: true })
  image: string;

  @OneToOne(() => PostEntity, (post) => post.postDetail)
  post: PostEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.postDetail, {
    onDelete: 'CASCADE',
  })
  comments: CommentEntity[];

  @OneToMany(() => ReactionEntity, (reaction) => reaction.postDetail, {
    onDelete: 'CASCADE',
  })
  reactions: ReactionEntity[];

  @OneToMany(() => ReupEntity, (reup) => reup.postDetail, {
    onDelete: 'CASCADE',
  })
  reups: ReupEntity[];

  @OneToMany(() => PostViewsEntity, (postViews) => postViews.postDetail, {
    onDelete: 'CASCADE',
  })
  views: PostViewsEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

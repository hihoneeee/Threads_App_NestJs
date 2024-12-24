import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { PostEntity } from 'src/Database/Entities/post.entity';
import { CommentEntity } from 'src/Database/Entities/comment.entity';
import { RoleEntity } from 'src/Database/Entities/role.entity';
import { MessageEntity } from 'src/Database/Entities/message.entity';
import { RequestEntity } from 'src/Database/Entities/request.entity';
import { JwtEntity } from 'src/Database/Entities/jwt.entity';
import { NotificationEntity } from 'src/Database/Entities/notification.entity';
import { ChangeEntity } from 'src/Database/Entities/change.entity';
import { ReactionEntity } from 'src/Database/Entities/reaction.entity';
import { ReupEntity } from 'src/Database/Entities/reup.entity';
import { SettingEntity } from 'src/Database/Entities/setting.entity';
import { FollowerEntity } from 'src/Database/Entities/follower.entity';
import { PostViewsEntity } from 'src/Database/Entities/post-views.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  userName: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ type: 'enum', enum: ['male', 'female', 'other'] })
  sex: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: ['connect', 'disconnect'],
    default: 'disconnect',
  })
  status: string;

  @ManyToOne(() => RoleEntity, (role) => role.users)
  role: RoleEntity;

  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];

  @OneToMany(() => FollowerEntity, (follower) => follower.follower)
  followers: FollowerEntity[];

  @OneToMany(() => RequestEntity, (request) => request.sender)
  sentRequests: RequestEntity[];

  @OneToMany(() => RequestEntity, (request) => request.receiver)
  receivedRequests: RequestEntity[];

  @OneToOne(() => SettingEntity, (setting) => setting.user)
  setting: SettingEntity;

  @OneToMany(() => JwtEntity, (jwt) => jwt.user)
  jwtTokens: JwtEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.user)
  notifications: NotificationEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.otherUser)
  sentNotifications: NotificationEntity[];

  @OneToMany(() => ChangeEntity, (change) => change.user)
  changes: ChangeEntity[];

  @OneToMany(() => PostViewsEntity, (postView) => postView.user)
  postViews: PostViewsEntity[];

  @OneToMany(() => ReactionEntity, (reaction) => reaction.user)
  reactions: ReactionEntity[];

  @OneToMany(() => ReupEntity, (reup) => reup.user)
  reups: ReupEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

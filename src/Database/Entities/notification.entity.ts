import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.notifications)
  user: UserEntity;

  @Column({ type: 'boolean', default: false })
  isRead: boolean;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.sentNotifications)
  otherUser: UserEntity;

  @CreateDateColumn()
  created_at: Date;
}

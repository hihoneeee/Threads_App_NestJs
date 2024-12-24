import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('changes')
export class ChangeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.changes)
  user: UserEntity;

  @Column({ nullable: true })
  emailResetCode: string;

  @Column({ type: 'timestamp', nullable: true })
  emailChangeAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  emailResetExpires: Date;

  @Column({ nullable: true })
  phoneResetCode: string;

  @Column({ type: 'timestamp', nullable: true })
  phoneChangeAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  phoneResetExpires: Date;

  @Column({ nullable: true })
  passwordResetToken: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordChangeAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpires: Date;
}

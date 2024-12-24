import { RoleHasPermissionEntity } from 'src/Database/Entities/role-has-permission.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('permissions')
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @OneToMany(
    () => RoleHasPermissionEntity,
    (roleHasPermission) => roleHasPermission.permission,
  )
  rolePermissions: RoleHasPermissionEntity[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

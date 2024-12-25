import { RoleEntity } from 'src/Database/Entities/role.entity';

export interface IRoleRepository {
  createRole(role: RoleEntity): Promise<RoleEntity>;
  getRoleById(id: number): Promise<RoleEntity | null>;
  updateRole(
    id: number,
    updateData: Partial<Pick<RoleEntity, 'value' | 'updated_at'>>,
  ): Promise<RoleEntity>;
}

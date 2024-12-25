import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/Database/Entities/Role.entity';
import { IRoleRepository } from 'src/Modules/Roles/Interfaces/i.role.repository';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {}

  async createRole(role: RoleEntity): Promise<RoleEntity> {
    return await this.repository.save(role);
  }

  async getRoleById(id: number): Promise<RoleEntity | null> {
    const role = await this.repository.findOne({
      where: { id },
    });
    return role;
  }
  async updateRole(
    id: number,
    updateData: Partial<Pick<RoleEntity, 'value' | 'updated_at'>>,
  ): Promise<RoleEntity> {
    await this.repository.update(id, updateData);

    return await this.repository.findOne({
      where: { id },
    });
  }
}

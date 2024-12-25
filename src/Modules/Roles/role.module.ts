import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/Database/Entities/role.entity';
import { RoleRepository } from 'src/Modules/Roles/role.repository';
import { RoleService } from 'src/Modules/Roles/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  providers: [
    {
      provide: 'IRoleService',
      useClass: RoleService,
    },
    {
      provide: 'IRoleRepository',
      useClass: RoleRepository,
    },
  ],
  exports: ['IRoleRepository', 'IRoleService'],
})
export class RoleModule {}

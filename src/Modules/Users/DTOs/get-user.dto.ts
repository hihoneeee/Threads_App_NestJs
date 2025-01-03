import { Expose, Transform } from 'class-transformer';
import { GetRoleDTO } from 'src/Modules/Roles/DTOs/get-role.dto';

export class GetUserDTO {
  @Expose()
  id?: number;

  @Expose()
  userName?: string;

  @Expose()
  email?: string;

  @Expose()
  avatar?: string;

  @Expose()
  sex?: string;

  @Expose()
  @Transform(({ obj }) =>
    obj.role
      ? {
          id: obj.role.id,
        }
      : null,
  )
  dataRole?: GetRoleDTO;
}

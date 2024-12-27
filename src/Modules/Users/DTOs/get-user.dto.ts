import { Exclude } from 'class-transformer';

export class GetUserDTO {
  @Exclude({ toPlainOnly: true })
  id?: number;
  @Exclude({ toPlainOnly: true })
  userName?: string;
  @Exclude({ toPlainOnly: true })
  email?: string;
  @Exclude({ toPlainOnly: true })
  avatar?: string;
  @Exclude({ toPlainOnly: true })
  sex?: string;
}

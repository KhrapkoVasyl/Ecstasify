import { Roles } from 'src/common/enums/roles.enum';

export type JwtPayload = {
  id: string;
  name: string;
  role: Roles;
};

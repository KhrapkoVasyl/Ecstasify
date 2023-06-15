import { Roles } from 'src/common/enums';

export type JwtPayload = {
  id: string;
  name: string;
  role: Roles;
};

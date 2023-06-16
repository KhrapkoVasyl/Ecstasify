import { Roles } from 'src/common/enums';

export type JwtPayloadUser = {
  id: string;
  name: string;
  role: Roles;
  accessToken?: string;
  refreshToken?: string;
};

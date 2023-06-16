import { UserRoleEnum } from 'src/common/enums';

export type JwtPayload = {
  id: string;
  name: string;
  role: UserRoleEnum;
  refreshTokenId?: string;
};

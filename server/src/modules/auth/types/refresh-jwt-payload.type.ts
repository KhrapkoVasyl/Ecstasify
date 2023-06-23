import { UserRoleEnum } from 'src/common/enums';

export type RefreshJwtPayload = {
  id: string;
  name: string;
  role: UserRoleEnum;
  refreshTokenId: string;
};

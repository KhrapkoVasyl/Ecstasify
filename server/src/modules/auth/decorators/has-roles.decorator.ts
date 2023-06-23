import { SetMetadata } from '@nestjs/common';
import { UserRoleEnum } from 'src/common/enums';

export const HasRoles = (...roles: UserRoleEnum[]) =>
  SetMetadata('roles', roles);

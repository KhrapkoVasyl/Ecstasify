import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/common/enums';

export const HasRoles = (role: Roles) => SetMetadata('role', role);

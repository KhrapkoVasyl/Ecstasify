import { SetMetadata } from '@nestjs/common';
import { Roles } from 'src/common/enums/roles.enum';

export const HasRoles = (role: Roles) => SetMetadata('role', role);

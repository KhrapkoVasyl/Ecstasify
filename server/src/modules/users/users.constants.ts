import { ErrorMessagesEnum } from 'src/common/enums';
import { TServiceErrorMessages } from 'src/common/types';

export const usersServiceErrorMessages: TServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.USERS_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.USER_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
};

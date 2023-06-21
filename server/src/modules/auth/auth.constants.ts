import { ErrorMessagesEnum } from 'src/common/enums';

export const MAX_USER_SESSIONS_QUANTITY = 3;

export const authServiceErrorMessages = {
  entityAlreadyExists: ErrorMessagesEnum.USER_ALREADY_EXISTS,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
  unauthorized: ErrorMessagesEnum.UNAUTHORIZED,
};

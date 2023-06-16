import { ErrorMessagesEnum } from 'src/common/enums';
import { TServiceErrorMessages } from 'src/common/types';

export const refreshTokensServiceErrorMessages: TServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.REFRESH_TOKEN_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.REFRESH_TOKEN_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
};

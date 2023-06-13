import { ErrorMessagesEnum } from 'src/common/enums';
import { TServiceErrorMessages } from 'src/common/types';

export const authorsServiceErrorMessages: TServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.AUTHORS_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.AUTHOR_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
};

import { ErrorMessagesEnum } from 'src/common/enums';
import { TServiceErrorMessages } from 'src/common/types';

export const filesServiceErrorMessages: TServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.FILES_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.FILE_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
};

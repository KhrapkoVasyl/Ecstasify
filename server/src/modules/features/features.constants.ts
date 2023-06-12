import { ErrorMessagesEnum } from 'src/common/enums';
import { TServiceErrorMessages } from 'src/common/types';

export const featuresServiceErrorMessages: TServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.FEATURES_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.FEATURE_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
};

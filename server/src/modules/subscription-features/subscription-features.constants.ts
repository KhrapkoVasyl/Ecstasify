import { ErrorMessagesEnum } from 'src/common/enums';
import { TServiceErrorMessages } from 'src/common/types';

export const subscriptionFeaturesServiceErrorMessages: TServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.SUBSCRIPTION_FEATURES_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.SUBSCRIPTION_FEATURE_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
};

import { ErrorMessagesEnum } from 'src/common/enums';
import { TServiceErrorMessages } from 'src/common/types';

export const subscriptionPlansServiceErrorMessages: TServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.SUBSCRIPTION_PLANS_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.SUBSCRIPTION_PLAN_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
};

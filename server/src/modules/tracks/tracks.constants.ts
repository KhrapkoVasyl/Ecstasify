import { ErrorMessagesEnum } from 'src/common/enums';
import { TServiceErrorMessages } from 'src/common/types';

export const tracksServiceErrorMessages: TServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.TRACKS_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.TRACK_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
};

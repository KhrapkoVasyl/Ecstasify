import { ErrorMessagesEnum } from 'src/common/enums';
import { TServiceErrorMessages } from 'src/common/types';

export const genresServiceErrorMessages: TServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.GENRES_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.GENRE_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
};

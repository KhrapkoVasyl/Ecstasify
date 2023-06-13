import { ErrorMessagesEnum } from 'src/common/enums';
import { TServiceErrorMessages } from 'src/common/types';

export const playlistsServiceErrorMessages: TServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.PLAYLISTS_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.PLAYLIST_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
};

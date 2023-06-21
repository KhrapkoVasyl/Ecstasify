import { ErrorMessagesEnum } from 'src/common/enums';

export const playlistsServiceErrorMessages = {
  entitiesNotFound: ErrorMessagesEnum.PLAYLISTS_NOT_FOUND,
  entityNotFound: ErrorMessagesEnum.PLAYLIST_NOT_FOUND,
  invalidData: ErrorMessagesEnum.INVALID_DATA,
  trackAlreadyInPlaylist: ErrorMessagesEnum.TRACK_ALREADY_IN_PLAYLIST,
};

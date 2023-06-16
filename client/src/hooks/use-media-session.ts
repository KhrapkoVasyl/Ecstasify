import { useEffect } from 'react';

interface IUseMediaSessionConfig {
  key: string;
  mediaMetadataInit?: MediaMetadataInit;
  actionHandlers: [MediaSessionAction, MediaSessionActionHandler][];
}

export const useMediaSession = ({
  key,
  actionHandlers,
  mediaMetadataInit,
}: IUseMediaSessionConfig) => {
  useEffect(() => {
    if ('mediaSession' in navigator) {
      const { mediaSession } = navigator;

      const mediaMetadata = new MediaMetadata(mediaMetadataInit);

      mediaSession.metadata = mediaMetadata;

      for (const [action, handler] of actionHandlers) {
        try {
          navigator.mediaSession.setActionHandler(action, handler);
        } catch (error) {
          console.log(
            `The media session action "${action}" is not supported yet.`
          );
        }
      }
    }
  }, [key]);
};

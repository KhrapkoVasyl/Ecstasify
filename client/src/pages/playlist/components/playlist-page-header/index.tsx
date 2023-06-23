import PlayButton from '@/components/play-button';
import DefaultPlaylistCover from '@/components/playlist/default-playlist-cover';
import { Stack, Typography } from '@mui/material';

const PlaylistPageHeader = ({ name, totalTracks, cover }) => {
  return (
    <Stack direction="row" gap={3}>
      <DefaultPlaylistCover size="large" />
      <Stack justifyContent="space-between">
        <Stack>
          <Typography
            variant="subtitle2"
            fontWeight={600}
            color="text.secondary"
          >
            Playlist
          </Typography>
          <Typography variant="h3" fontWeight={600}>
            {name}
          </Typography>
          <Typography variant="body2">{totalTracks} songs</Typography>
        </Stack>
        <PlayButton
          onClick={() => undefined}
          isPlaying={false}
          disabled={false}
        />
      </Stack>
    </Stack>
  );
};

export default PlaylistPageHeader;

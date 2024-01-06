import { LoadingProgress } from '@/components/loading-progress';
import { useMounted, useStores } from '@/hooks';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

const image = {
  small:
    'https://htmlcolorcodes.com/assets/images/colors/red-color-solid-background-1920x1080.png',
  medium:
    'https://htmlcolorcodes.com/assets/images/colors/bright-blue-color-solid-background-1920x1080.png',
  large:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Flag_of_Libya_%281977%E2%80%932011%29.svg/300px-Flag_of_Libya_%281977%E2%80%932011%29.svg.png',
};

const HomePage = () => {
  const {
    tracksStore: { tracks, getAllTracks, getAllTracksLoading, resetTracks },
    headerStore: { searchString, setSearchString },
  } = useStores();

  const mounted = useMounted();

  const debouncedGetAllTracks = useMemo(
    () => (mounted ? debounce(getAllTracks, 500) : getAllTracks),
    [mounted]
  );

  useEffect(
    () => () => {
      if ('cancel' in debouncedGetAllTracks) {
        debouncedGetAllTracks.cancel();
      }

      resetTracks();

      setSearchString('');
    },
    []
  );

  useEffect(() => {
    debouncedGetAllTracks(searchString);
  }, [searchString]);

  return (
    <>
      {getAllTracksLoading && <LoadingProgress />}
      <Stack direction="row" flexWrap="wrap" gap="16px" sx={{ height: '100%' }}>
        {tracks.map((track) => (
          <Card
            key={track.id}
            elevation={0}
            sx={{
              maxWidth: 188,
              padding: '16px',
              backgroundColor: '#F9FAFB',
              flexWrap: 'nowrap',
              alignSelf: 'start',
            }}
          >
            <picture>
              <source srcSet={image.large} media="(min-width: 1200px)" />
              <source srcSet={image.medium} media="(min-width: 700px)" />
              <img width={156} height={156} src={image.small} />
            </picture>
            <CardContent
              sx={{ padding: 0, mt: '16px', paddingBottom: '0 !important' }}
            >
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                fontSize="16px"
                fontWeight={700}
              >
                {track.name}
              </Typography>
              <Typography fontSize="14px" color="text.secondary">
                {track.author.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
        {tracks.length <= 0 && searchString && !getAllTracksLoading && (
          <Box
            sx={{
              textAlign: 'center',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h6">
              No results found for &quot;{searchString}&quot;
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Please make sure that your are spelled correctly
            </Typography>
          </Box>
        )}
      </Stack>
    </>
  );
};

export default observer(HomePage);

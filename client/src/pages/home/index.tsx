import { LoadingProgress } from '@/components/loading-progress';
import { useStores } from '@/hooks';
import { MusicNote } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo } from 'react';
import debounce from 'lodash.debounce';

const HomePage = () => {
  const {
    tracksStore: { tracks, getAllTracks, getAllTracksLoading },
    headerStore: { searchString },
  } = useStores();

  const debouncedGetAllTracks = useMemo(() => debounce(getAllTracks, 500), []);

  useEffect(() => {
    getAllTracks();

    return () => debouncedGetAllTracks.cancel();
  }, []);

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
            {/* <CardMedia
              sx={{ width: 156, height: 156 }}
              component="img"
              src="https://cdn-icons-png.flaticon.com/512/6373/6373791.png"
            /> */}
            <CardMedia
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 156,
                height: 156,
                background: (theme) => theme.palette.grey[200],
              }}
            >
              <MusicNote color="primary" sx={{ fontSize: '40px' }} />
            </CardMedia>
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

import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

const HomePage = () => {
  const tracks = [
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
    {
      id: 'sdf',
      name: 'Die For You',
      author: 'The Weeknd',
      cover: 'https://i.scdn.co/image/ab67616d0000b273a048415db06a5b6fa7ec4e1a',
    },
  ];

  return (
    <Stack gap={1}>
      <Typography variant="h4" fontWeight={600}>
        Good morning
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap="16px">
        {tracks.map((track) => (
          <Card
            key={track.id}
            elevation={0}
            sx={{
              maxWidth: 188,
              padding: '16px',
              backgroundColor: '#F9FAFB',
              flexWrap: 'nowrap',
            }}
          >
            <CardMedia
              sx={{ width: 156, height: 156 }}
              component="img"
              src={track.cover}
            />
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
                {track.author}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default HomePage;

import {
  Card,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { FavoriteRounded, FavoriteBorderRounded } from '@mui/icons-material';
import { styles } from './styles';

type TrackPreviewProps = {
  isFavorite?: boolean;
  authorName: string;
  trackName: string;
  trackCoverImg?: string;
};

const TrackPreview = ({
  isFavorite = true,
  trackName,
  authorName,
  trackCoverImg,
}: TrackPreviewProps) => (
  <Card elevation={0} sx={styles.trackCard}>
    <CardMedia sx={styles.trackImg} component="img" image={trackCoverImg} />
    <Box>
      <Typography
        lineHeight={1}
        fontWeight={600}
        component="div"
        variant="subtitle1"
      >
        {trackName}
      </Typography>
      <Typography color="text.secondary" fontWeight={400} variant="body2">
        {authorName}
      </Typography>
    </Box>
    <Tooltip title="Add To Favorites">
      <IconButton>
        {isFavorite ? (
          <FavoriteRounded sx={styles.favoriteIcon} fontSize="small" />
        ) : (
          <FavoriteBorderRounded fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  </Card>
);

export default TrackPreview;

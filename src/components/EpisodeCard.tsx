import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { openModalEpisodeAction } from '../redux/actions/episodeModalAction';
import { CardActionArea } from '@mui/material';

export default function EpisodeCard({ episode }: any) {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModalEpisodeAction({ isOpen: true, episode }) as any);
  };

  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea onClick={handleOpenModal}>
        <CardMedia
          component="img"
          height="250"
          image="/rickandmortydefault.jpg"
          alt="card_image"
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{ textAlign: 'center' }}
          >
            {episode.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

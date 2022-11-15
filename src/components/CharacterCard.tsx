import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useDispatch } from 'react-redux';
import { openModalAction } from '../redux/actions/characterModalAction';
import { CardActionArea } from '@mui/material';

export default function CharacterCard({ character } : any) {
  const dispatch = useDispatch();
  const { name, image } = character;

  const handleOpenModal = () => {
    dispatch(openModalAction({ isOpen: true, character }) as any);
  };
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea onClick={handleOpenModal}>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt="card_image"
          sx={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body1"
            component="div"
            sx={{ textAlign: 'center' }}
          >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

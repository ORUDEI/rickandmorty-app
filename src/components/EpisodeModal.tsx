import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Tooltip from '@mui/material/Tooltip';
import { openModalEpisodeAction } from '../redux/actions/episodeModalAction';
import { useDispatch, useSelector } from 'react-redux';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import IconButton from '@mui/material/IconButton';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

interface modalState {
  episodeModal: {
    error: null;
    loading: boolean;
    info: {
      isOpen: boolean;
      episode: {
        __typename: string;
        id: string;
        name: string;
        air_date: string;
        episode: string;
        characters: [{ name: string; image: string }];
      };
    };
  };
}

type EpisodeInfoData = {
  __typename: string;
  id: string;
  name: string;
  air_date: string;
  episode: string;
  characters: [{ name: string; image: string }];
};

export default function EpisodeModal() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<EpisodeInfoData>();
  const [isFavorite, setIsFavorite] = useState(false);
  const cleanState = {};

  const handleClose = () =>
    dispatch(
      openModalEpisodeAction({ isOpen: false, episode: cleanState }) as any
    );

  const isOpen = useSelector(
    (state: modalState) => state.episodeModal.info.isOpen
  );

  const episodeInfo = useSelector(
    (state: modalState) => state.episodeModal.info.episode
  );

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setData(episodeInfo);
  }, [episodeInfo]);

  useEffect(() => {
    var validation = JSON.parse(
      localStorage.getItem('favoriteEpisode') || '[]'
    );
    if (validation.find((episode: any) => episode.id == episodeInfo?.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [episodeInfo]);

  const handleFavorite = () => {
    if (localStorage.getItem('favoriteEpisode') == null) {
      localStorage.setItem('data', '[]');
    }
    var oldData = JSON.parse(localStorage.getItem('favoriteEpisode') || '[]');
    oldData.push(data);
    localStorage.setItem('favoriteEpisode', JSON.stringify(oldData));
    window.location.reload();
    setIsFavorite(true);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton
              color="warning"
              onClick={handleFavorite}
              disabled={isFavorite}
            >
              <StarOutlineIcon fontSize="large" />
            </IconButton>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              alt="avatar_img"
              src="/rickandmortydefault.jpg"
              sx={{ width: 150, height: 150 }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: 1,
              paddingTop: 1,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {data?.name}
            </Typography>
          </Box>
          <Grid
            container
            spacing={1}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Typography variant="body1" color="text.secondary">
              {data?.air_date}
            </Typography>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{ display: 'flex', justifyContent: 'center', paddingTop: 1 }}
          >
            <Typography variant="body1" color="text.secondary">
              {data?.episode}
            </Typography>
          </Grid>
          <Grid
            container
            spacing={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 1,
              paddingBottom: 2,
            }}
          >
            <Typography variant="body1" sx={{ display: 'flex' }}>
              Characters on this episode:
            </Typography>
          </Grid>
          <Grid
            container
            spacing={{ xs: 1 }}
            columns={{ xs: 4 }}
            sx={{  display: 'flex',}}
          >
            <List
              sx={{
                display: { xs: 'flex' },
                overflow: 'scroll',
                gap: 1,
                width: { xs: 200, md: 'auto' },
              }}
            >
              {data?.characters?.map((character, i) => (
                <Grid item key={i}>
                  <Tooltip title={character.name}>
                    <Avatar alt="avatar_img" src={character.image} />
                  </Tooltip>
                </Grid>
              ))}
            </List>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

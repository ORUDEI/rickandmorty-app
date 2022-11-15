import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InfoPill from './InfoPill';
import { useDispatch, useSelector } from 'react-redux';
import { openModalAction } from '../redux/actions/characterModalAction';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

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
  characterModal: {
    info: {
      isOpen: boolean;
      character: {
        __typename: string;
        id: number;
        name: string;
        status: string;
        species: string;
        type: string;
        gender: string;
        image: string;
      };
    };
    error: null;
    loading: boolean;
  };
  favoriteCharacter: {
    data: [];
  };
}

type CharacterInfoData = {
  __typename: string;
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  image: string;
};

export default function CharacterModal() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<CharacterInfoData>();
  const [isFavorite, setIsFavorite] = useState(false);
  const cleanState = {};
  const handleClose = () =>
    dispatch(openModalAction({ isOpen: false, character: cleanState }) as any);

  const isOpen = useSelector(
    (state: modalState) => state.characterModal.info.isOpen
  );

  const characterInfo = useSelector(
    (state: modalState) => state.characterModal.info.character
  );

  useEffect(() => {
    var validation = JSON.parse(
      localStorage.getItem('favoriteCharacters') || '[]'
    );

    if (validation.find((episode: any) => episode.id == characterInfo?.id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [characterInfo]);

  useEffect(() => {
    setData(characterInfo);
  }, [characterInfo]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleFavorite = () => {
    if (localStorage.getItem('favoriteCharacters') == null) {
      localStorage.setItem('data', '[]');
    }
    var oldData = JSON.parse(
      localStorage.getItem('favoriteCharacters') || '[]'
    );
    oldData.push(data);
    localStorage.setItem('favoriteCharacters', JSON.stringify(oldData));
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
              justifyContent: { xs: 'center', md: 'flex-end' },
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
              src={data?.image}
              sx={{ width: 150, height: 150 }}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: 2,
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
            sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}
          >
            <Grid sx={{ width: 'fit-content' }}>
              <InfoPill
                colorBG="#FAFD7C99"
                title="Status"
                info={data?.status}
              />
            </Grid>
            <Grid sx={{ width: 'fit-content' }}>
              <InfoPill
                colorBG="#82491E99"
                title="Species"
                info={data?.species}
              />
            </Grid>
            <Grid sx={{ width: 'fit-content' }}>
              <InfoPill
                colorBG="#A6EEE699"
                title="Gender"
                info={data?.gender}
              />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

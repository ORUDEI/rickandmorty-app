import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CharacterCard from '../src/components/CharacterCard';
import CharacterModal from '../src/components/CharacterModal';
import EpisodeCard from '../src/components/EpisodeCard';
import EpisodeModal from '../src/components/EpisodeModal';
import Layout from '../src/components/Layout';

import { Roboto } from '@next/font/google';

const roboto = Roboto({
  weight: '700',
  subsets: ['latin'],
});

const Favorites = () => {
  const [data, setData] = useState([]);
  const [favoriteEpisode, setFavoriteEpisode] = useState([]);

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('favoriteCharacters') || '[]'));
    setFavoriteEpisode(
      JSON.parse(localStorage.getItem('favoriteEpisode') || '[]')
    );
  }, []);

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: { sx: 'block', md: 'flex' },
            justifyContent: 'center',
            padding: 3,
          }}
        >
          <Grid item sx={{ marginLeft: 2 }}>
            <Typography className={roboto.className} variant="h3">
              Your favorite characters
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={{ xs: 1 }}
          columns={{ xs: 4 }}
          sx={{ paddingLeft: 6 }}
        >
          {data?.map((character, i) => (
            <Grid item key={i}>
              <CharacterCard key={i} character={character} />
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: { sx: 'block', md: 'flex' },
            justifyContent: 'center',
            padding: 3,
          }}
        >
          <Grid item sx={{ marginLeft: 2 }}>
            <Typography variant="h3" className={roboto.className}>
              Your favorite episodes
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={{ xs: 1 }}
          columns={{ xs: 4 }}
          sx={{ paddingLeft: 6 }}
        >
          {favoriteEpisode?.map((episode, i) => (
            <Grid item key={i}>
              <EpisodeCard key={i} episode={episode} />
            </Grid>
          ))}
        </Grid>
        <EpisodeModal />
        <CharacterModal />
      </Grid>
    </Layout>
  );
};

export default Favorites;

import React, { useCallback, useState } from 'react';
import Layout from '../../src/components/Layout';
import Grid from '@mui/material/Grid';
import EpisodeCard from '../../src/components/EpisodeCard';
import { IconButton, InputBase, Paper, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';
import SearchIcon from '@mui/icons-material/Search';
import EpisodeModal from '../../src/components/EpisodeModal';
import client from '../../gql/client';
import { EpisodesResponse } from '../../interfaces/episodesInterface';
import GET_EPISODES from '../../gql/query/episodes';
import { useRouter } from 'next/router';
import Pagination from '../../src/components/Pagination';

const Episodes: React.FC<{ data: EpisodesResponse }> = ({ data }) => {
  const [filterData, setFilterData] = useState('');

  const { info } = data.episodes;
  const { count, next, pages, prev } = info;

  const router = useRouter();
  const pathname = router.pathname;

  const onClick = useCallback(() => {
    if (filterData.length === 0) {
      router.push(`/episodes/`);
    } else {
      router.push(`/episodes/${filterData}`);
    }
  }, [router, filterData]);

  const onEnter = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        if (filterData.length === 0) {
          router.push(`/episodes/`);
        } else {
          router.push(`/episodes/${filterData}`);
        }
        e.preventDefault();
      }
    },
    [router, filterData]
  );

  return (
    <Layout>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          sx={{
            display: { sx: 'block', md: 'flex' },
            justifyContent: 'space-between',
            padding: 3,
          }}
        >
          <Grid item>
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
                marginLeft: 4,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search episode..."
                inputProps={{ 'aria-label': 'Search' }}
                onChange={(e) => setFilterData(e.target.value)}
                value={filterData}
                onKeyDown={(e) => onEnter(e)}
              />
              <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="search"
                onClick={onClick}
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid
            sx={{
              display: { sx: 'block', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Pagination
              next={next}
              pages={pages}
              prev={prev}
              count={count}
              pathname={pathname}
              router={router}
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={{ xs: 1 }}
          columns={{ xs: 4 }}
          sx={{ paddingLeft: 6 }}
        >
          {data.episodes.results.map((episode, i) => (
            <Grid item key={i}>
              <EpisodeCard key={episode.id} episode={episode} />
            </Grid>
          ))}
        </Grid>
        <EpisodeModal />
      </Grid>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let {
    query: { page },
  } = context;

  page === undefined ? (page = '1') : page;

  const { data } = await client.query<Promise<EpisodesResponse>>({
    query: GET_EPISODES,
    variables: { page: +page },
  });

  return {
    props: { data },
  };
};

export default Episodes;

import React, { useCallback, useState } from 'react';
import CharacterCard from '../../src/components/CharacterCard';
import Layout from '../../src/components/Layout';
import Grid from '@mui/material/Grid';
import { IconButton, InputBase, Paper, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CharacterModal from '../../src/components/CharacterModal';
import { GetServerSideProps } from 'next';
import client from '../../gql/client';
import { CharactersResponse } from '../../interfaces/charactersInterface';
import Pagination from '../../src/components/Pagination';
import { useRouter } from 'next/router';
import GET_CHARACTER from '../../gql/query/filterCharacter';
import { ParsedUrlQuery } from 'querystring';

interface IParams extends ParsedUrlQuery {
  name: string;
}

const Characters: React.FC<{ data: CharactersResponse }> = ({ data }) => {
  const { next, pages, prev, count } = data.characters.info;
  const [filterData, setFilterData] = useState('');

  const router = useRouter();
  const pathname = router.pathname;

  const onClick = useCallback(() => {
    if (filterData.length === 0) {
      router.push(`/characters/`);
    } else {
      router.push(`/characters/${filterData}`);
    }
  }, [router, filterData]);

  const onEnter = useCallback(
    (e: any) => {
      if (e.key === 'Enter') {
        if (filterData.length === 0) {
          router.push(`/characters/`);
        } else {
          router.push(`/characters/${filterData}`);
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
          <Grid>
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
                placeholder="Search character..."
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
          {data.characters.results.map((character, i) => (
            <Grid item key={i}>
              <CharacterCard key={character.id} character={character} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <CharacterModal />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params as IParams;

  const { data } = await client.query<
    Promise<{ character: CharactersResponse }>
  >({
    query: GET_CHARACTER,
    variables: { name: name || '' },
  });

  return {
    props: { data },
  };
};

export default Characters;

import React, { useCallback } from 'react';
import Button from '@mui/material/Button';
import { NextRouter } from 'next/router';
import { Typography, Grid } from '@mui/material';

interface PaginationProps {
  next: number | null;
  prev: number | null;
  router: NextRouter;
  count: number;
  pages: number;
  pathname: string;
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  next,
  pages,
  prev,
  router,
  pathname,
}) => {
  const { query } = router;

  const handleNext = useCallback(() => {
    if (!next) {
      return;
    }

    router.push({ pathname: pathname, query: { ...query, page: next } });
  }, [next, pathname, query, router]);

  const handlePrev = useCallback(() => {
    if (!prev) {
      return;
    }

    router.push({ pathname: pathname, query: { ...query, page: prev } });
  }, [prev, pathname, query, router]);

  return (
    <Grid
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'space-between' },
        gap: 2,
        marginTop: { xs: 2, md: 0 },
      }}
    >
      <Grid>
        <Button
          size="medium"
          variant="outlined"
          color="primary"
          onClick={handlePrev}
          sx={{ width: 100 }}
        >
          Previous
        </Button>
      </Grid>
      <Grid>
        <Typography sx={{ textAlign: 'center' }} variant="subtitle1">{`Page ${
          query.page || 1
        } of ${pages}`}</Typography>
      </Grid>
      <Grid>
        <Button
          size="medium"
          variant="outlined"
          onClick={handleNext}
          sx={{ width: 100 }}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default Pagination;

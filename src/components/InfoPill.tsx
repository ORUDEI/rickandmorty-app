import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const InfoPill = ({ colorBG, title, info }: any) => {
  return (
    <Box
      sx={{
        backgroundColor: `${colorBG}`,
        display: 'flex',
        alignItems: 'center',
        padding: 1,
        borderRadius: 3,
        boxShadow: 1,
        gap:1
      }}
    >
      <Grid item>
        <Typography variant="body1" color="text.secondary"><b>{title}:</b></Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" color="text.secondary">{info}</Typography>
      </Grid>
    </Box>
  );
};

export default InfoPill;

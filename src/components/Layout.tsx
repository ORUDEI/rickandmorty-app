import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, MenuItem, MenuList, Typography } from '@mui/material';
import Link from 'next/link';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import { Roboto } from '@next/font/google';
import { useRouter } from 'next/router';

const roboto = Roboto({
  weight: '700',
  subsets: ['latin'],
});

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Layout({ children }: any) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const router = useRouter();
  const pathname = router.pathname;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar sx={{ backgroundColor: '#95C7CC' }}>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-around',
            }}
          >
            <Button
              className={roboto.className}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: 18 }}
            >
              <Link href="/characters">
                {pathname === '/characters' ||
                pathname === '/characters/[name]' ? (
                  <Typography
                    className={roboto.className}
                    sx={{
                      fontSize: 18,
                      borderBottom: 3,
                    }}
                  >
                    CHARACTERS
                  </Typography>
                ) : (
                  <Typography
                    className={roboto.className}
                    sx={{
                      fontSize: 18,
                    }}
                  >
                    CHARACTERS
                  </Typography>
                )}
              </Link>
            </Button>
            <Button
              className={roboto.className}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: 18 }}
            >
              <Link href="/episodes">
                {pathname === '/episodes' || pathname === '/episodes/[name]' ? (
                  <Typography
                    className={roboto.className}
                    sx={{
                      fontSize: 18,
                      borderBottom: 3,
                    }}
                  >
                    EPISODES
                  </Typography>
                ) : (
                  <Typography
                    className={roboto.className}
                    sx={{
                      fontSize: 18,
                    }}
                  >
                    EPISODES
                  </Typography>
                )}
              </Link>
            </Button>
            <Button
              className={roboto.className}
              sx={{ my: 2, color: 'white', display: 'block', fontSize: 18 }}
            >
              <Link href="/favorites">
                {pathname === '/favorites' ? (
                  <Typography
                    className={roboto.className}
                    sx={{
                      fontSize: 18,
                      borderBottom: 3,
                    }}
                  >
                    FAVORITES
                  </Typography>
                ) : (
                  <Typography
                    className={roboto.className}
                    sx={{
                      fontSize: 18,
                    }}
                  >
                    FAVORITES
                  </Typography>
                )}
              </Link>
            </Button>
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }), display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <main>{children}</main>
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <MenuList>
          <Link href="/characters">
            <MenuItem>
              <ListItemIcon>
                <FaceRetouchingNaturalIcon
                  fontSize="large"
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                Characters
              </ListItemText>
            </MenuItem>
          </Link>
          <Link href="/episodes">
            <MenuItem>
              <ListItemIcon>
                <SlideshowIcon
                  fontSize="large"
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                Episodes
              </ListItemText>
            </MenuItem>
          </Link>
          <Link href="/favorites">
            <MenuItem>
              <ListItemIcon>
                <StarOutlineIcon
                  fontSize="large"
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                />
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                Favorites
              </ListItemText>
            </MenuItem>
          </Link>
        </MenuList>
      </Drawer>
    </Box>
  );
}

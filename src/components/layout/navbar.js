import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SportsVolleyballIcon from '@mui/icons-material/SportsVolleyball';
import {useAuth} from "../../hooks/useAuth";
import {Link, useNavigate} from "react-router-dom";
import {API_URL} from "../../utils";

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const {authData, setAuth} = useAuth();
  const navigate = useNavigate();

  const logout = () => {
      setAuth(null);
      navigate("/");
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <SportsVolleyballIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            VolleyVision
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <Link to={'/teams'}>Zespoły</Link>
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <Link to={'/matches'}>Mecze</Link>
              </Button>
              <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                <Link to={'/players'}>Zawodnicy</Link>
              </Button>
          </Box>
            {authData ?
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Avatar" src={API_URL + authData.user.player.photo_url} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
                <MenuItem >
                  <Link to={'/user/account'}>Moje konto</Link>
                </MenuItem>
                <MenuItem >
                  <Link to={'/user/teams'}>Zespoły</Link>
                </MenuItem>
                <MenuItem >
                  <Link to={'/user/matches'}>Mecze</Link>
                </MenuItem>
                <MenuItem >
                  <Link to={'/user/friends'}>Znajomi</Link>
                </MenuItem>
                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Wyloguj</Typography>
                </MenuItem>
            </Menu>
          </Box>
                :
                <div>
                    <Button color="secondary" variant="contained" sx={{ m: 1, width: '25ch' }} href="/login/">
                        Zaloguj
                    </Button>
                </div>
        }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

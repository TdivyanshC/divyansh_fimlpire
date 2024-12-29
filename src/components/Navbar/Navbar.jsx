import { AccountCircle, Brightness4, Brightness7, Menu } from "@mui/icons-material";
import { AppBar, Avatar, Button, Drawer, IconButton, Toolbar, useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { useContext, useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Search from "../Search/Search";
import { fetchToken, createSessionId, moviesApi } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setUser, userSelector } from '../../features/auth';
import useStyles from './styles';
import { ColorModeContext } from "../../utils/ToggleColorMode";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();

  const colorMode = useContext(ColorModeContext);

  const token = localStorage.getItem('request_token');
  const currentSessionId = localStorage.getItem('session_id');

  useEffect(() => {
    const logInUser = async () => {
      try {
        if (token) {
          if (currentSessionId) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${currentSessionId}`);

          dispatch(setUser(userData));
          console.log('User logged in successfully:', isAuthenticated);

       
        } else {
              const sessionId = await createSessionId();
              const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);
              dispatch(setUser(userData));
              console.log("setuser is working");             
        }
        }
      } catch (error) {
        console.error('Error logging in user:', error);
      }
    };

    logInUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
                <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) :
              (
                <Button
                color="inherit"
                component={Link}
                to='profile/:id'
                className={classes.linkButton}
                onClick={() => {}}
              >              
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src='https://imgs.search.brave.com/rvY9Hvx7M1H3bPlN_0X5AOfMSleMR18l14mw4jnEFho/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS81/MTIvMTQ3LzE0NzEz/MS5wbmc'
                />
              </Button>   
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen(!mobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;

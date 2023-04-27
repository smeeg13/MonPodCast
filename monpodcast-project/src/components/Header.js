import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
} from "@material-ui/core";
import { MdMenu } from "react-icons/md";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "fixed",
    zIndex: theme.zIndex.appBar + 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 1rem",
  },
}));

const Header = ({ handlePlayClick }) => {
  const liveStreamUrl = "https://rhonefm.ice.infomaniak.ch/rhonefm-high.mp3";
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const classes = useStyles();
  const theme = useTheme();

  // Use useMediaQuery to detect screen size
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleMenuClick = (event) => {
    setAnchorElMenu(event.currentTarget);
    setAnchorElUser(null);
  };

  const handleUserClick = (event) => {
    setAnchorElUser(event.currentTarget);
    setAnchorElMenu(null);
  };

  const handleMenuClose = () => {
    setAnchorElMenu(null);
  };

  const handleUserClose = () => {
    setAnchorElUser(null);
  };

  return (
    <div className={classes.header}>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          {isMobile ? (
            // Show burger menu on mobile
            <>
              <IconButton
                color="inherit"
                aria-label="menu"
                onClick={handleMenuClick}
              >
                <MdMenu />
              </IconButton>
              <Menu
                anchorEl={anchorElMenu}
                keepMounted
                open={Boolean(anchorElMenu)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <a href="/">Home</a>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <a href="/podcasts">Podcasts</a>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <a href="/categories">Categories</a>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <a href="/loginScreen">Login</a>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <a href="/series">Series</a>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <a href="/textGenerationScreen">Text recognition</a>
                </MenuItem>
              </Menu>
            </>
          ) : (
            // Show all as on desktop
            <>
              <img
                src="https://miniextensions.com/wp-content/uploads/sites/5/2019/12/placeholder.com-logo1.png"
                alt="logo"
                height="32"
              />
              <a href="/" style={{ padding: "0 1rem" }}>
                Home
              </a>
              <a href="/podcasts" style={{ padding: "0 1rem" }}>
                Podcasts{" "}
              </a>
              <a href="/categories" style={{ padding: "0 1rem" }}>
                Categories
              </a>
              <a href="/loginScreen" style={{ padding: "0 1rem" }}>
                Login
              </a>
              <a href="/series" style={{ padding: "0 1rem" }}>
                Series
              </a>
              <a
                href="/textGenerationScreen"
                style={{ padding: "0 1rem", marginRight: "auto" }}
              >
                Text recognition
              </a>
            </>
          )}

          <IconButton
            color="inherit"
            onClick={handleUserClick}
            style={{ marginLeft: "auto" }}
          >
            <Avatar alt="User" src="/user.jpg" />
          </IconButton>
          <Menu
            anchorEl={anchorElUser}
            keepMounted
            open={Boolean(anchorElUser)}
            onClose={handleUserClose}
          >
            <MenuItem onClick={handleUserClose}>Profile</MenuItem>
            <MenuItem onClick={handleUserClose}>My account</MenuItem>
            <MenuItem onClick={handleUserClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;

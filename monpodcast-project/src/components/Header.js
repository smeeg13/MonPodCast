import { useState } from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  InputBase,
} from "@material-ui/core";
import { MdMenu, MdSearch } from "react-icons/md";
import { makeStyles } from "@material-ui/core/styles";
import styles from "../styles/Header.module.css";

const useStyles = makeStyles((theme) => ({
  header: {
    position: "fixed",

    zIndex: theme.zIndex.appBar + 1,
  },

  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.common.white,
    },
    marginRight: theme.spacing(1),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Header = ({ handlePlayClick }) => {
  const liveStreamUrl = "https://rhonefm.ice.infomaniak.ch/rhonefm-high.mp3";
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const classes = useStyles();
  // Define a state variable to store the search results
const [searchResults, setSearchResults] = useState([]);
const [searchTerm, setSearchTerm] = useState(' Search… ');

// Define an event handler to handle user input
const handleInputChange = (event) => {
  setSearchTerm(event.target.value)
  handleSearch(searchTerm);
}

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

  const handleSearch = async (searchTerm) => {
    const response = await fetch(`/api/search?term=${searchTerm}`);
    const data = await response.json();
    setSearchResults(data);
    console.log(res);
    setSearchTerm(' Search… ')
  };

  return (
    <div className={classes.header}>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            style={{ marginRight: 20 }}
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
              {" "}
              <Link href="/">home</Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              {" "}
              <Link href="/podcasts">Podcasts</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/categories">Categories</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/loginScreen">Login</Link>
            </MenuItem>
          </Menu>
          <img
            src="https://miniextensions.com/wp-content/uploads/sites/5/2019/12/placeholder.com-logo1.png"
            alt="logo"
            height="32"
          />
          {/* <button
            className={styles.liveButton}
            onClick={() => handlePlayClick(liveStreamUrl, "Live Stream")}
          >
            Live
          </button> */}
          <div className={classes.search}>

            <InputBase
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleInputChange(e.target.value);
                }
              }}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              style={{ marginLeft: 50 }}
            >searchTerm</InputBase>
          </div>
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

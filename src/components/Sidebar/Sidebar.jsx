import {
    Box,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
  } from "@mui/material";
  import { useTheme } from "@mui/styles";
  import { Link } from "react-router-dom";
  import useStyles from "./styles";
  import { useGetGenresQuery } from "../../services/TMBD";
  import genreIcons from "../../assets/genres";
  import { useDispatch, useSelector } from "react-redux";
  import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { useEffect } from "react";
  
  const redLogo = "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
  const blueLogo = "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
  
  const categories = [
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
  ];
  
  const Sidebar = ({ setMobileOpen }) => {
    const classes = useStyles();
    const theme = useTheme();
    const { data, isFetching } = useGetGenresQuery();
    const dispatch = useDispatch();
    const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);

    useEffect(() => {
      setMobileOpen(false);
    }, [genreIdOrCategoryName])
  
    return (
      <>
        <Link to="/" className={classes.imageLink}>
          <img
            className={classes.image}
            src={theme.palette.mode === "light" ? redLogo : blueLogo}
            alt="App Logo"
          />
        </Link>
        <Divider />
        <List>
          <ListSubheader>Categories</ListSubheader>
          {categories.map(({ label, value }) => (
            <Link key={label} className={classes.links} to="/">
              <ListItem
                onClick={() => {
                  dispatch(selectGenreOrCategory(value));
                  setMobileOpen(false); // Close drawer on selection
                }}
                button
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[label.toLowerCase()]}
                    className={classes.genreImage}
                    height={30}
                    alt={`${label} icon`}
                  />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          <ListSubheader>Genres</ListSubheader>
          {!data || isFetching ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            data.genres.map(({ name, id }) => (
              <Link key={name} className={classes.links} to="/">
                <ListItem
                  onClick={() => {
                    dispatch(selectGenreOrCategory(id));
                    setMobileOpen(false); // Close drawer on selection
                  }}
                  button
                >
                  <ListItemIcon>
                    <img
                      src={genreIcons[name.toLowerCase()]}
                      className={classes.genreImage}
                      height={30}
                      alt={`${name} icon`}
                    />
                  </ListItemIcon>
                  <ListItemText primary={name} />
                </ListItem>
              </Link>
            ))
          )}
        </List>
      </>
    );
  };
  
  export default Sidebar;
  
import { Grid, Grid2 } from "@mui/material";
import useStyles from './styles';
import Movie from "../Movie/Movie";

const MovieList = ({movies, numberOfMovies, excludeFirst}) => {
    const classes = useStyles();
    const startFrom = excludeFirst ? 1 : 0; 
    
  return (
    <Grid container classnme={classes.moviesContainer}>
        {movies.results.slice(startFrom, numberOfMovies).map((movie, i) => (
            <Movie key={i} movie={movie} i={i}/>
        ))}
    </Grid>
  )
}

export default MovieList
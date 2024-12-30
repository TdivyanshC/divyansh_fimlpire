import { Grid, Grid2, Grow, Rating, Typography } from '@mui/material';
import useStyles from './styles';
import { Link } from 'react-router-dom';


const Movie = ({movie , i}) => {
    const classes = useStyles();
    console.log(movie,i);
  return (
    <Grid item xs={12} sm={6} md={5} lg={4} xl={3} className={classes.movie}>
        <Grow in key={i} timeout={(i + 1)* 250}>
            <Link className={classes.links} to={`/movie/${movie.id}`}>
            <img 
            alt={movie.title} 
            className={classes.image} 
            src={movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
        : 'https://via.placeholder.com/200x300?text=No+Image'} />
            <Typography className={classes.title} variant='h5'>{movie.title}</Typography>
            <Rating readOnly value={movie?.vote_average / 2} />
            </Link>
        </Grow>
    </Grid>
  )
}

export default Movie
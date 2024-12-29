import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useGetListQuery, useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMBD';
import { Box, Button, ButtonGroup, CircularProgress, Grid, Modal, Rating, Typography } from '@mui/material';
import useStyles from './style';
import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { useDispatch, useSelector } from 'react-redux';
import { Add, ArrowBack, Favorite, FavoriteBorderOutlined, Language, MovieCreation, Remove, Theaters } from '@mui/icons-material';
import MovieList from '../../components/MovieList/MovieList';
import { userSelector} from "../../features/auth"
import axios from 'axios';


const MovieInformation = () => {
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const {user} = useSelector(userSelector);
  
  const { data, isFetching, error } = useGetMovieQuery(id);
  const {data: favoriteMovies} = useGetListQuery({ listName: 'favorite/movies', accountId: user?.id, sessionId: localStorage.getItem('session_id'), page: 1});
  const {data: watchlistMovies} = useGetListQuery({ listName: 'watchlist/movies', accountId: user?.id, sessionId: localStorage.getItem('session_id'), page: 1});
  const {data: recommendations, isFetching: isRecommendationsFetching} = useGetRecommendationsQuery({list: 'recommendations', movie_id: id});

  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id))
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id))
  }, [watchlistMovies, data]);

  
  
  const addToFavorites = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user?.id}/favorite?api_key=${import.meta.env.VITE_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,{
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist= async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user?.id}/watchlist?api_key=${import.meta.env.VITE_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`,{
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });

    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Link to="/">Something has gone wrong. Go back</Link>
      </Box>
    );
  }

  return (
    <Grid container spacing={4} className={classes.containerSpaceAround}>
      {/* Movie Poster */}
      <Grid item xs={12} md={4}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          className={classes.poster}
          alt={data?.title}
        />
      </Grid>

      {/* Movie Details */}
      <Grid item container direction="column" xs={12} md={7}>
        <Typography variant="h4" align="center" gutterBottom>
          {data?.title} ({data?.release_date?.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>

        {/* Rating and Runtime */}
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" alignItems="center">
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography variant="subtitle2" gutterBottom style={{ marginLeft: '10px' }}>
              {data?.vote_average} / 10
            </Typography>
            <Typography variant="h7" align="center" gutterBottom style={{ marginLeft: '20px' }}>
              {data?.runtime} min {data?.spoken_languages?.length > 0 ? `/ ${data?.spoken_languages[0]?.name}` : ''}
            </Typography>
          </Box>
        </Grid>

        {/* Genres */}
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre) => (
            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => {
                dispatch(selectGenreOrCategory(genre.id));
              }}
            >
              {genreIcons[genre.name.toLowerCase()] && (
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  className={classes.genreImages}
                  height={30}
                  alt={`${genre.name} icon`}
                />
              )}
              <Typography color="textPrimary" variant="subtitle1" >
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant='h5' gutterBottom style={{ marginTop: '10px'}}>
          Overview
        </Typography>
        <Typography  style={{marginBottom: '2rem'}}>
          {data?.overview}
        </Typography>
        <Typography variant='h5' gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {data && data.credits.cast.map((character, i) => (
           character.profile_path && ( <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration: 'none'}}> 
            <img src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} className={classes.castImage}/>
            <Typography color='textPrimary'>{character?.name}
              <Typography color='textSecondary'>
                {character.character.split('/'[10])}
              </Typography>
            </Typography>
            </Grid>)
          )).slice(0,6)}
        </Grid>
        <Grid item container style={{marginTop: '2rem'}}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size='small' variant='outlined'>
                <Button target='_blank' rel='noopener noreferrer' href={data?.homepage} endIcon={<Language />}>
                Website
                </Button>
                <Button target='_blank' rel='noopener noreferrer' href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieCreation />}>
                IMDB
                </Button>
                <Button onClick={() => setOpen(true)} href='#' endIcon={<Theaters/>}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonsContainer}>
              <ButtonGroup size='small' variant='outlined'>
               <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutlined/> : <Favorite />}>
               {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
               </Button>
               <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove/> : <Add />}>
               Watchlist
               </Button>
               <Button endIcon={<ArrowBack/>} sx={{borderColor: 'primary.main'}}>
               <Typography style={{textDecoration: 'none'}} component={Link} to='/' color='inherit' variant='subtitle'>
               Back</Typography>
               </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          You might also like
        </Typography>
        {recommendations 
        ? <MovieList movies={recommendations} numberOfMovies={12}/>
        : <Box> Sorry, nothing was found </Box>
        }
      </Box>
      <Modal
      closeAfterTransition
      className={classes.modal}
      open={open}
      onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe 
          autoPlay 
          className={classes.videos} 
          frameBorder='0' 
          title='Trailer' 
          src={`https://www.youtube.com/embed/${data.videos.results[0].key}`} 
          allow='autoplay'
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;

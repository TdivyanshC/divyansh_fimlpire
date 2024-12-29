import { Box, CircularProgress,  Typography, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../services/TMBD";
import MovieList from "../components/MovieList/MovieList";
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";
import { useState } from "react";
import Pagination from "../components/pagination/Pagination";
import FeaturedMovie from "../components/FeaturedMovie.jsx/FeaturedMovie";


const Movies = () => {
  const [page, setPage] = useState(1)
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const {data, error, isFetching} = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery});

  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 15 : 17;

  if(isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='4rem' />
      </Box>
    )
  }

  if(!data.results.length){
    return (
      <Box display='flex' alignItems='center' mt='20px'>
        <Typography variant="h4">
        No movies that match that name.
        <br/>
        Please search for something else.
        </Typography>
      </Box>
    )
  }

  if(error) return 'An error has occured';
  
  return (
    <div>
      <FeaturedMovie movie={data.results[0]}/>
      <MovieList movies={data} numberOfMovies={numberOfMovies} excludeFirst/>
      <Pagination  currentPage={page} totalPages={data.total_pages} setPage={setPage}/>
    </div>
  )
}

export default Movies
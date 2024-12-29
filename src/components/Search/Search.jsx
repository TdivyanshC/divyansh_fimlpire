import { InputAdornment, TextField } from "@mui/material"
import {Search as SearchIcon} from '@mui/icons-material'
import { useLocation } from "react-router-dom"
import { useDispatch } from "react-redux"

import useStyles from './style'
import { useState } from "react"
import {searchMovie} from '../../features/currentGenreOrCategory'

const Search = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [query, setQuery] = useState('')
    const handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            dispatch(searchMovie(query));
        }
    };
  return (
    <div className={classes.searchContainer}>
        <TextField 
        onKeyUp={handleKeyPress} 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant="standard"
        slotProps={{
            input: {
                className: classes.input,
                startAdornment: (
                    <InputAdornment position="start" >
                        <SearchIcon />
                    </InputAdornment>
                ),
            }
        }}
        />
    </div>
  )
}

export default Search
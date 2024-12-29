import { CssBaseline} from '@mui/material';
import { Route, Routes} from 'react-router-dom';
import Movies from './pages/Movies';
import Profile from './pages/Profile';

import Actors from './pages/Actors';
import Navbar from './components/Navbar/Navbar';
import useStyles from './styles'
import MovieInformation from './pages/MovieInformation/MovieInformation';

const App = () => {
    const classes = useStyles();
  return (
    <div className={classes.root}>
    <CssBaseline/>
    <Navbar/>
    <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Routes>
            <Route path='/movie/:id' element={<MovieInformation/>} />
            <Route path='/actors/:id' element={<Actors/>} />
            <Route path='/' element={<Movies />}/>
            <Route path='/profile/:id' element={<Profile />} />
        </Routes>
    </main>
    </div>
  )
}

export default App

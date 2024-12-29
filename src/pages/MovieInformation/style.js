import { Height, Padding } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import { borderRadius, display, fontSize, height, width } from "@mui/system";


export default makeStyles((theme) => ({
    containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0 !important',
    [theme.breakpoints.down('sm')] : {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
   },
   poster: {
    borderRadius: '20px',
    boxShadow: '0.5rem 1rem 1rem rgb(64, 64 ,74)',
    width: '80%',
    [theme.breakpoints.down('md')] : {
        margin: '0 auto',
        width: '50%',
        height: '350px',
    },
    [theme.breakpoints.down('sm')] : {
        margin: '0 auto',
        width: '100%',
        height: '350px',
        marginBottom: '30px',
    },
   },
   genresContainer: {
    margin: '10px 0 !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
   },
   genreImages: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight: '10px'
   },
   links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
        padding: '0.5rem 1rem',
    },
   },
   castImage: {
    width: '100%',
    maxWidth: '7rem',
    height: '8rem',
    objectFit: 'cover',
    borderRadius: '10px'
   },
   buttonsContainer:{
    display: 'flex',
    width: '100%',
    flexDirection:'column',
    gap: '1rem',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')] : {
        flexDirection: 'column'
    },
   },
   modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
   },
   videos: {
    width: '50%',
    height: '50%',
    [theme.breakpoints.down('sm')] : {
        height: '90%',
        width: '90%',
    },
   }
}));
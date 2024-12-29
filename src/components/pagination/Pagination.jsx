
import { Button, Typography } from '@mui/material';
import useStyles from './style'


const Pagination = ({ currentPage, totalPages, setPage}) => {
    const styles = useStyles();

    const handlePrev = () => {
        if(currentPage !== 1) {
            setPage((prevPage) => prevPage -1);
        }
    };
    const handleNext = () => {
        if( currentPage !== totalPages) {
            setPage((prevPage) => prevPage +1);
        }
    };

    if(totalPages === 0) return null;

  return (
    <div className={styles.container}>
        <Button onClick={handlePrev} className={styles.button} variant='contained' color='primary' type='button'>Prev</Button>
        <Typography variant='h4' className={styles.pageNumber}>{currentPage}</Typography>
        <Button onClick={handleNext} className={styles.button} variant='contained' color='primary' type='button'>Next</Button>

    </div>
  )
}

export default Pagination
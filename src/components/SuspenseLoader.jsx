import { Box, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const SuspenseLoader = () => {
    return (
        <Box>
            <CircularProgress></CircularProgress>
            <Typography> Loading...</Typography>
        </Box>
        
    )
}

export default SuspenseLoader;
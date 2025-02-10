import errorImage from '../assets/error.png'
import { Container, Box, Typography } from '@mui/material'

export default function NotFound() {
    return (
        <Container 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                minHeight: '70vh' 
            }}
        >
            <Box
                component="img"
                src={errorImage}
                alt="Error"
                sx={{ width: 150, height: 150, mb: 2 }}
            />
            <Typography
                variant="h4"
                sx={{ 
                    fontFamily: 'Pretendard Variable, pretendard',
                    color: '#3f3f3f',
                    fontWeight: 700
                }}
            >
                This page could not be found
            </Typography>
        </Container>
    )
}
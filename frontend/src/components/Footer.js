import { Box, Container, Typography } from '@mui/material'

export default function Footer() {
    return (
        <Box 
            component="footer" 
            sx={{ 
                position: 'fixed', 
                bottom: 0, 
                width: '100%', 
                bgcolor: '#f5f5f5', 
                color: 'black', 
                py: 2 
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" align="center">
                    © {new Date().getFullYear()} JJW Website. All rights reserved.
                </Typography>
            </Container>
        </Box>
    )
}
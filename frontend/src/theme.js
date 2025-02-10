// custom theme
import { createTheme } from '@mui/material/styles'

const theme = createTheme ({
    palette: {
        primary: {
            main: '#97d5e8',
        },
        secondary: {
            main: '#e8f5f9',
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    }
})

export default theme
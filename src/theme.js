import {indigo, pink, white} from "@mui/material/colors";
import {createTheme} from "@mui/material";


const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: pink,
        white: 'white'
    },
    components: {
        MuiInputLabel: {
          styleOverrides: {
            root: {
                color: 'white',
                borderColor: 'white'
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
                color: 'white',
                borderColor: 'white',
                outlineColor: 'white',
            },
          },
        },
        MuiTab: {
          styleOverrides: {
            root: {
                color: 'white',
                borderColor: 'white',
                outlineColor: 'white',
                backgroundColor: indigo[800],
            },
          },
        },
    },
});

export default theme;
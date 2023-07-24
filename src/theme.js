import {indigo, pink} from "@mui/material/colors";
import {createTheme} from "@mui/material";


const theme = createTheme({
    palette: {
        primary: indigo,
        secondary: pink,
    },
    components: {
        // Name of the component
        MuiInputLabel: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
                color: 'white',
                borderColor: 'white'
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
                color: 'white',
                borderColor: 'white',
                outlineColor: 'white',
            },
          },
        },
    },
});

export default theme;
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import {makeStyles} from "@mui/styles";


const useStyles = makeStyles({
    container: {
        width: '250px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
    item: {
    margin: '8px',
  },
})

export default function Match({match}) {

    const classes = useStyles();

    return (
        <div className={classes.container}>

            <h4 >{match.team1 + "VS" + match.team2}</h4>
        </div>
    )
}


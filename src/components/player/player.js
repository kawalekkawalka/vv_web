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

export default function Player({player}) {

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <Avatar className={classes.item} alt="avatar" src={"http://localhost:8000" + player.photo}
            sx={{ width: 56, height: 56 }} variant="rounded"/>
            <h4 >{player.name + " " + player.surname}</h4>
        </div>
    )
}

Player.propTypes = {
    player : PropTypes.shape({}).isRequired
}

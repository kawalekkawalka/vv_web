import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";


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
        <Link to={`/details/player/${player.id}`} className={classes.container}>
            <Avatar className={classes.item} alt="avatar" src={"http://localhost:8000" + player.photo}
            sx={{ width: 56, height: 56 }} variant="rounded"/>
            <h4 >{player.name + " " + player.surname}</h4>
        </Link>
    )
}

Player.propTypes = {
    player : PropTypes.shape({}).isRequired
}

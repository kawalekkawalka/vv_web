import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import {makeStyles} from "@mui/styles";
import {Link} from "react-router-dom";
import {API_URL} from "../../utils";


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

export default function Player({player, big}) {

    const classes = useStyles();

    return (
        <Link to={`/details/player/${player.id}`} className={classes.container}>
            <Avatar className={classes.item} alt="avatar" src={API_URL + player.photo_url}
            sx={{ width: big ? 100 : 56, height: big ? 100 : 56 }} variant="rounded"/>
            <h4 style={{ fontSize: big ? '24px' : 'inherit', marginLeft: big ? '20px' : 'inherit' }}>
                {player.name + " " + player.surname}
            </h4>
        </Link>
    )
}

Player.propTypes = {
    player : PropTypes.shape({}).isRequired
}

Player.defaultProps = {
  big: false,
};
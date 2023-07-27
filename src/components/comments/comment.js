import PropTypes from "prop-types";
import {makeStyles} from "@mui/styles";
import Player from "../player/player";
import React from "react";


const useStyles = makeStyles({
    comments: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        left: '5%',
        marginBottom: '16px',
    },
})
export default function Comment({comment}) {

    const classes = useStyles();

    return (
        <div className={classes.comments}>
            <Player player={comment.user.player} />
            <p>{comment.description}</p>
        </div>
    )
}

Comment.propTypes = {
    comment : PropTypes.shape({}).isRequired
}

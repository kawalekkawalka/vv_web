import {makeStyles} from "@mui/styles";
import PropTypes from "prop-types";
import Player from "../player/player";
import {DateTime} from "luxon";
import {calculateSetResults} from "../../utils";
import {Link} from "react-router-dom";
import React from "react";

export default function Team({team}) {

    return (
        <Link to={`/details/team/${team.id}` } key={team.id}>
            <h2>{team.name}</h2>
            <h3>{team.description}</h3>
        </Link>
    )
}

Team.propTypes = {
    team : PropTypes.shape({}).isRequired
}

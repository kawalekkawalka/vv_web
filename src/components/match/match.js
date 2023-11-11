import {makeStyles} from "@mui/styles";
import PropTypes from "prop-types";
import Player from "../player/player";
import {DateTime} from "luxon";
import {calculateSetResults} from "../../utils";
import {Link} from "react-router-dom";
import React from "react";

export default function Match({match}) {
    const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    const matchTime = DateTime.fromFormat(match.time, format);
    const matchScore = calculateSetResults(match);

    return (
        <Link to={`/details/match/${match.id}` } key={match.id}>
            <h2 >{match.team1_name} vs {match.team2_name} {matchScore &&
                <div>
                    ({matchScore[0].team1score}:{matchScore[0].team2score})
                </div>}
            </h2>
            <h3>{matchTime.toFormat('yyyy-MM-dd HH:mm')}</h3>
        </Link>
    )
}

Match.propTypes = {
    match : PropTypes.shape({}).isRequired
}

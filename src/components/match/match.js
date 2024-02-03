import React from "react";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";
import PropTypes from "prop-types";
import {calculateSetResults} from "../../utils";

export default function Match({ match, small }) {
  const matchTime = DateTime.fromISO(match.time);
  const matchScore = calculateSetResults(match);

  const matchStyles = {
    fontSize: small ? '10px' : 'inherit',
  };

   return (
        <Link to={`/details/match/${match.id}` } key={match.id} style={matchStyles}>
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
  match: PropTypes.shape({
    id: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    team1_name: PropTypes.string.isRequired,
    team2_name: PropTypes.string.isRequired,
  }).isRequired,
  small: PropTypes.bool,
};

Match.defaultProps = {
  small: false,
};

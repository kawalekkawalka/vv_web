// MatchHeader.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { calculateSetResults } from '../../utils';
import { DateTime } from 'luxon';
import Button from '@mui/material/Button';

const MatchWithScore = ({ match }) => {
  const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
  const matchTime = DateTime.fromFormat(match.time, format);
  const matchScore = calculateSetResults(match);

  return (
    <div>
      <h1>
        <Link to={`/details/team/${match.team1}`}>{match.team1_name}</Link>
        <span> vs </span>
        <Link to={`/details/team/${match.team2}`}>{match.team2_name}</Link>
        {matchScore && (
          <div>
            ({matchScore[0].team1score}:{matchScore[0].team2score})
          </div>
        )}
      </h1>
      <h3>
        {Array.from({ length: 5 }, (_, index) => {
          const team1Score = match[`set${index + 1}_team1_score`];
          const team2Score = match[`set${index + 1}_team2_score`];

          if (team1Score === 0 && team2Score === 0) {
            return null; //
          }

          return (
            <span key={index}>
              ({team1Score}:{team2Score}){index < 4 ? ', ' : ''}
            </span>
          );
        })}
      </h3>
      <h3>{matchTime && matchTime.toFormat('yyyy-MM-dd HH:mm')}</h3>
    </div>
  );
};

export default MatchWithScore;

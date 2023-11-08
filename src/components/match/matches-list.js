import {makeStyles} from "@mui/styles";
import React, {useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useFetchMatches} from "../../hooks/fetch-matches";
import {Link} from "react-router-dom";
import {DateTime} from 'luxon';


const useStyles = makeStyles({

})

export default function MatchesList({params}) {

    const {authData} = useAuth()
    const [matches, loading, error] = useFetchMatches(params)
    const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";

    function calculateSetResults(match) {
        const setResults = [];
        let team1 = 0;
        let team2 = 0;

        for (let i = 1; i <= 5; i++) {
            const team1Score = match[`set${i}_team1_score`];
            const team2Score = match[`set${i}_team2_score`];

            if(team1Score == 0 && team2Score == 0) {
                break;
            }
            if (team1Score > team2Score) {
                team1++;
            } else if (team1Score < team2Score) {
                team2++;
            }
        }
        if (team1 != 0 || team2 != 0) {
            setResults.push({team1score: team1, team2score: team2});
            return setResults
        }
        return null;
    }

    return (
        <div>
            {matches && matches.map(match => {
                const matchTime = DateTime.fromFormat(match.time, format);
                const matchScore = calculateSetResults(match);
                return <div key={match.id}>
                    <h2 >{match.team1_name} vs {match.team2_name} {matchScore &&
                        <div>
                            ({matchScore[0].team1score}:{matchScore[0].team2score})
                        </div>
                    }</h2>
                    <h3>{matchTime.toFormat('yyyy-MM-dd HH:mm')}</h3>
                </div>
            })}
        </div>
    )
}


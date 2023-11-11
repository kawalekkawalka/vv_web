import {makeStyles} from "@mui/styles";
import React, {useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useFetchMatches} from "../../hooks/fetch-matches";
import {Link} from "react-router-dom";
import {DateTime} from 'luxon';
import {calculateSetResults} from "../../utils";


const useStyles = makeStyles({

})

export default function MatchesList({params}) {
    console.log(params)
    const {authData} = useAuth()
    const [matches, loading, error] = useFetchMatches(params)
    const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";

    return (
        <div>
            {matches && matches.map(match => {
                const matchTime = DateTime.fromFormat(match.time, format);
                const matchScore = calculateSetResults(match);
                return <Link to={`/details/match/${match.id}` } key={match.id}>
                    <h2 >{match.team1_name} vs {match.team2_name} {matchScore &&
                        <div>
                            ({matchScore[0].team1score}:{matchScore[0].team2score})
                        </div>
                    }</h2>
                    <h3>{matchTime.toFormat('yyyy-MM-dd HH:mm')}</h3>
                </Link>
            })}
        </div>
    )
}


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

    return (
        <div>
            {matches && matches.map(match => {
                const matchTime = DateTime.fromFormat(match.time, format)
                return <div key={match.id}>
                    <h2 >{match.team1_name} vs {match.team2_name} </h2>
                    <h3>{matchTime.toFormat('yyyy-MM-dd HH:mm')}</h3>
                </div>
            })}
        </div>
    )
}


import {makeStyles} from "@mui/styles";
import React, {useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useFetchMatches} from "../../hooks/fetch-matches";
import {Link} from "react-router-dom";


const useStyles = makeStyles({

})

export default function MatchesList({params}) {

    const {authData} = useAuth()
    const [matches, loading, error] = useFetchMatches(params)

    return (
        <div>
            {matches && matches.map(match => {
            return <h2 key={match.id}>{match.team1}: {match.team2} {match.time}</h2>
            })}
        </div>
    )
}


import {makeStyles} from "@mui/styles";
import React, {useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useFetchMatches} from "../../hooks/fetch-matches";
import {Link} from "react-router-dom";
import {DateTime} from 'luxon';
import {calculateSetResults} from "../../utils";
import Match from "./match";


const useStyles = makeStyles({

})

export default function MatchesList({params}) {
    const {authData} = useAuth()
    const [matches, loading, error] = useFetchMatches(params)

    return (
        <div>
            {matches && matches.map(match => {
                return <Match match={match}></Match>
            })}
        </div>
    )
}

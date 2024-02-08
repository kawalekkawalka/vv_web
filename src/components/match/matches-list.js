import {makeStyles} from "@mui/styles";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useFetchMatches} from "../../hooks/fetch-matches";
import {Link} from "react-router-dom";
import {DateTime} from 'luxon';
import {calculateSetResults} from "../../utils";
import Match from "./match";
import Paper from "@mui/material/Paper";
import {lighten} from "polished";


const useStyles = makeStyles({

})

export default function MatchesList({params, reload}) {
    const {authData} = useAuth()
    const [matches, loading, error, fetchMatches] = useFetchMatches(params)
    const backgroundColor = lighten(0.05, '#282c34');

    useEffect(() => {
    if (reload) {
      fetchMatches();
    }
  }, [params, reload]);

    return (
        <div>
            {matches && matches.map(match => {
                return <Paper
                          elevation={3}
                          sx={{
                            padding: '20px',
                            margin: '20px',
                            backgroundColor: backgroundColor,
                            color: 'white',
                            paddingTop: '5px'
                          }}
                        >
                            <Match match={match}></Match>
                        </Paper>
            })}
        </div>
    )
}

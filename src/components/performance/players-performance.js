import {makeStyles, useTheme} from "@mui/styles";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {getAvgTeamPerformance} from "../../services/performance-services";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {useFetchAvgTeamPerformance} from "../../hooks/fetch-avg-team-performance";
import { lighten } from 'polished';
import {useFetchAvgPlayersPerformance} from "../../hooks/fetch-avg-player-performance";


const useStyles = makeStyles({

})

export default function PlayersPerformance({params, players}) {
    const {authData} = useAuth()
    const theme = useTheme();
    const [performances] = useFetchAvgPlayersPerformance(params, players)

    return (
    <div>
      {performances && (
        <h1>Dziala</h1>
          )}
    </div>
          )
}

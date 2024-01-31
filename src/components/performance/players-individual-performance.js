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
import PlayerInTeamPerformanceTable from "../tables/player-in-team-performance-table";


const useStyles = makeStyles({

})

export default function PlayersIndividualPerformance({params, players}) {
    const {authData} = useAuth()
    const theme = useTheme();
    const [performances] = useFetchAvgPlayersPerformance(params, players)
    return (
    <div>
      {performances && (
        <PlayerInTeamPerformanceTable performances={performances} tableName="Średnie występy w secie zawodników"></PlayerInTeamPerformanceTable>
          )}
    </div>
          )
}

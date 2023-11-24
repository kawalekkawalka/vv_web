import {makeStyles, useTheme} from "@mui/styles";
import React, {useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {getAvgTeamPerformance} from "../../services/performance-services";
import {Grid} from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {useFetchAvgTeamPerformance} from "../../hooks/fetch-avg-team-performance";
import { lighten } from 'polished';


const useStyles = makeStyles({

})

const polishNames = {
    total_score: 'Ilość punktów',
    total_score_balance: 'Bilans punktów',
    serve: 'Zagrywki',
    serve_error: 'Błędy w zagrywce',
    serve_ace: 'Asy serwisowe',
    reception: 'Ilość przyjęć',
    positive_reception: 'Ilość pozytywnych przyjęć',
    reception_error: 'Ilość błędów w przyjęciu',
    positive_reception_percentage: 'Procent pozytywnego przyjęcia',
    spike: 'Ilość ataków',
    spike_point: 'Punkty w ataku',
    spike_block: 'Ataki w blok',
    spike_error: 'Błędy w ataku',
    spike_kill_percentage: 'Skuteczność ataku w procentach',
    spike_efficiency: 'Efektywność ataku w procentach',
    block_amount: 'Bloki',
    dig: 'Obrony'
  };

export default function TeamPerformance({params}) {
    const {authData} = useAuth()
    const theme = useTheme();
    const [performance] = useFetchAvgTeamPerformance(params)
    const backgroundColor = lighten(0.05, '#282c34');
    return (
    <div>
      {performance && performance.results && (
        <Paper
          elevation={3}
          sx={{
            padding: '20px',
            margin: '20px',
            backgroundColor: backgroundColor,
            color: 'white',
            paddingTop: '5px'
          }}
        >
            <h1>Średnie wartości zawodnika w meczu</h1>
          <Grid container spacing={3}>
            {Object.entries(performance.results).map(([key, value]) => (
              <Grid item xs={6} sm={3} key={key} style={{ textAlign: 'center' }}>
                <Paper
                  style={{
                    padding: '10px',
                    textAlign: 'center',
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    height: '75%',
                  }}
                >
                  <Typography variant="body2" color="white">
                    {polishNames[key] || key}
                  </Typography>
                  <Typography variant="h6">{value}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </div>
    )
}

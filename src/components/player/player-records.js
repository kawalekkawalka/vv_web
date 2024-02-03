import {makeStyles, useTheme} from "@mui/styles";
import React, {useState} from "react";
import {Link, useParams} from "react-router-dom";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import {useFetchPlayerRecords} from "../../hooks/fetch-player-records";
import {lighten} from "polished";
import Match from "../match/match";


const polishNames = {
    total_score: 'Ilość punktów',
    total_score_balance: 'Bilans punktów',
    serve: 'Zagrywki',
    serve_error: 'Błędy w zagrywce',
    serve_ace: 'Asy serwisowe',
    reception: 'Ilość przyjęć',
    positive_reception: 'Pozytywne przyjęcia',
    reception_error: 'Błędy w przyjęciu',
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

const useStyles = makeStyles({})

export default function PlayerRecords() {
    const {id} = useParams();
    const [records, loading, error] = useFetchPlayerRecords({player: id});
    const theme = useTheme();
    const backgroundColor = lighten(0.05, "#282c34");

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            {records && records.length > 0 ? (
                <Paper
                    elevation={3}
                    sx={{
                        padding: '20px',
                        margin: '20px',
                        backgroundColor: backgroundColor,
                        color: 'white',
                        paddingTop: '30px'
                    }}
                >
                    <Grid container spacing={3}>
                        {Object.entries(records[0]).map(([key, value]) => (
                            <Paper
                                elevation={3}
                                sx={{
                                    padding: '20px',
                                    margin: '20px',
                                    backgroundColor: theme.palette.primary.main,
                                    color: 'white',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '40%',
                                }}
                                key={key}
                            >
                                <div style={{textAlign: 'center', marginRight: '20px', width: '50%'}}>
                                    <h2>{polishNames[key] || key}</h2>
                                    <h2>{value.amount}</h2>
                                </div>
                                {value.match && <Match match={value.match} small style={{paddingRight: '20px',}}/>}
                            </Paper>
                        ))}


                    </Grid>
                </Paper>
            ) : (
                <h1>Zawodnik nie wystąpił jeszcze w żadnym meczu</h1>
                )
            }
        </div>
    );
}

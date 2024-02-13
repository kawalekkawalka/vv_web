import {makeStyles} from "@mui/styles";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import Paper from "@mui/material/Paper";
import {lighten} from "polished";
import {useFetchPlayers} from "../../hooks/fetch-players";
import Player from "./player";


const useStyles = makeStyles({})

export default function PlayersList({params}) {
    const {authData} = useAuth()
    const [players, loading, error] = useFetchPlayers(params)
    const backgroundColor = lighten(0.05, '#282c34');

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <div>
            {players && players.map(player => {
                return <Paper
                    elevation={3}
                    sx={{
                        padding: '20px',
                        margin: '20px',
                        backgroundColor: backgroundColor,
                        color: 'white',
                        paddingTop: '5px',
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Player player={player} big={true}></Player>
                </Paper>
            })}
        </div>
    )
}

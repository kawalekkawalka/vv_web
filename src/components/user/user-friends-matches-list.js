import {makeStyles} from "@mui/styles";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import Paper from "@mui/material/Paper";
import {lighten} from "polished";
import {useFetchUserFriendsMatches} from "../../hooks/fetch-user-friends-matches";
import Match from "../match/match";
import Player from "../player/player";
import Box from "@mui/material/Box";

const useStyles = makeStyles({})

export default function UserFriendsMatchesList({params}) {
    const {authData} = useAuth()
    const [matches, loading, error, fetchMatches] = useFetchUserFriendsMatches(params)
    const backgroundColor = lighten(0.05, '#282c34');

    return (
        <div>
            {matches && matches.length > 0 ? (
                matches.map((data) => (
                    <Paper
                        elevation={3}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '20px',
                            backgroundColor: backgroundColor,
                            color: 'white',
                            paddingTop: '5px',
                            width: '50%',
                            margin: 'auto',
                            mb: '20px',
                        }}
                    >
                        <Player player={data.player} sx={{flex: '0 0 auto'}}/>
                        <Box sx={{marginLeft: '20px', flex: '1 1 right'}}>
                            <Match match={data.match}/>
                        </Box>
                    </Paper>

                ))
            ) : (
                <h1>Brak takich meczów.</h1>
            )}

        </div>
    )
}

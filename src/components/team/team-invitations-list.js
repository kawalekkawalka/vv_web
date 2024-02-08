import {makeStyles} from "@mui/styles";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useFetchTeamInvitations} from "../../hooks/fetch-team-invitations";
import Player from "../player/player";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";
import {deleteTeamInvitation} from "../../services/team-invitations-services";
import {joinTeam} from "../../services/team-services";
import Paper from "@mui/material/Paper";
import {lighten} from "polished";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
});

export default function TeamInvitationsList({params}) {
    const classes = useStyles();
    const {authData} = useAuth();
    const [invitations, loading, error] = useFetchTeamInvitations(params);
    const [actualInvitations, setInvitations] = useState([]);
    const backgroundColor = lighten(0.05, "#282c34");

    const handleAcceptInvitation = async (invitationId, player, team) => {
        const joined = await joinTeam({player: player, team: team}, authData.token);
        if (joined) {
            await handleDeleteInvitation(invitationId);
        }
    };

    const handleDeleteInvitation = async (id) => {
        const deleted = await deleteTeamInvitation(id, authData.token);
        if (deleted) {
            setInvitations((prevInvitations) => prevInvitations.filter((invitation) =>
                invitation.id !== id));
        }
    };

    useEffect(() => {
        setInvitations(invitations);
    }, [invitations]);

    return (
        <div>
            {actualInvitations && actualInvitations.map(invitation => {
                return (
                    <Paper
                        key={invitation.id}
                        elevation={3}
                        sx={{
                            padding: "20px",
                            margin: "20px",
                            backgroundColor: backgroundColor,
                            color: "white",
                            alignItems: 'center',
                            width: '50%',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        <div className={classes.container}>
                            <Player player={invitation.user.player}></Player>
                            <IconButton aria-label="accept invitation" onClick={() =>
                                handleAcceptInvitation(invitation.id, invitation.user.player.id, invitation.team)}>
                                <AddCircleIcon sx={{color: "white"}}/>
                            </IconButton>
                            <IconButton aria-label="delete invitation" onClick={() =>
                                handleDeleteInvitation(invitation.id)}>
                                <RemoveCircleIcon sx={{color: "white"}}/>
                            </IconButton>
                        </div>

                    </Paper>
                );
            })}
        </div>
    );
}

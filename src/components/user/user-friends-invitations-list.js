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
import {useFetchUserFriendsInvitations} from "../../hooks/fetch-user-friends-invitations";
import {addFriend} from "../../services/user-friendship-services";
import {deleteFriendInvitation} from "../../services/user-friendship-invitations-services";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
    },
});

export default function UserFriendsInvitationsList({params}) {
    const classes = useStyles();
    const {authData} = useAuth();
    const [invitations, loading, error] = useFetchUserFriendsInvitations(params);
    const [actualInvitations, setInvitations] = useState([]);
    const backgroundColor = lighten(0.05, "#282c34");

    const handleAcceptInvitation = async (user1) => {
        const joined = await addFriend({user1: user1, user2: authData.user.id}, authData.token);
        if (joined) {
            await handleDeleteInvitation(user1);
        }
    };

    const handleDeleteInvitation = async (user1) => {
        const deleted = await deleteFriendInvitation(
            {inviter: user1, invitee: authData.user.id}, authData.token);
        if (deleted) {
            setInvitations((prevInvitations) => prevInvitations.filter((invitation) =>
                invitation.id !== user1));
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
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "20px",
                            backgroundColor: backgroundColor,
                            color: "white",

                            width: "50%",
                            margin: "auto",
                            mb: "20px",
                        }}
                    >
                        <Player player={invitation.player}></Player>
                        <Box>
                            <Button color="primary" variant="contained" aria-label="accept invitation" onClick={() =>
                                handleAcceptInvitation(invitation.id)} sx={{ marginRight: '8px' }}>
                                Akceptuj
                            </Button>
                            <Button color="primary" variant="contained" aria-label="delete invitation" onClick={() =>
                                handleDeleteInvitation(invitation.id)}>
                                Odrzuć
                            </Button>
                        </Box>
                    </Paper>
                );
            })}
        </div>
    );
}

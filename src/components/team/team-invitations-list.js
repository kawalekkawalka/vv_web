import {makeStyles} from "@mui/styles";
import React, {useEffect, useState} from "react";
import {useAuth} from "../../hooks/useAuth";
import {useFetchMatches} from "../../hooks/fetch-matches";
import {Link} from "react-router-dom";
import {deleteTeamInvitation} from "../../services/team-invitations-services";
import {useFetchTeamInvitations} from "../../hooks/fetch-team-invitations";
import Player from "../player/player";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";


const useStyles = makeStyles({

})

export default function TeamInvitationsList({params}) {

    const {authData} = useAuth()
    const [invitations, loading, error] = useFetchTeamInvitations(params)
    const [actualInvitations, setInvitations] = useState([]);

    const handleDeleteInvitation = async (id) => {
        const deleted = await deleteTeamInvitation(id, authData.token);
        if(deleted){
            setInvitations((prevInvitations) => prevInvitations.filter((invitation) =>
                invitation.id !== id));
        }
    }

    useEffect(() => {
        setInvitations(invitations);
    }, [invitations]);


    return (
        <div>
            {actualInvitations && actualInvitations.map(invitation => {
                return <div key={invitation.id}>
                    <Player player={invitation.user.player}></Player>
                    <IconButton aria-label="delete invitation" onClick={() =>
                        handleDeleteInvitation(invitation.id)}>
                            <RemoveCircleIcon/>
                    </IconButton>
                </div>
            })}
        </div>
    )
}


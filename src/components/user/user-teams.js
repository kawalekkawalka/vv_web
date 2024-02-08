import React, {useState} from "react";
import {useFetchTeams} from "../../hooks/fetch-teams";
import Paper from "@mui/material/Paper";
import {lighten} from "polished";
import Team from "../team/team";
import TeamList from "../team/team-list";
import {useAuth} from "../../hooks/useAuth";
import Button from "@mui/material/Button";
import {sendPerformance} from "../../services/performance-services";
import {NotificationManager} from "react-notifications";
import TeamForm from "../team/team-form";

function UserTeams() {
    const {authData} = useAuth()
    const [reloadTeamList, setReloadTeamList] = useState(false);

    const handleReloadTeamList = () => {
    setReloadTeamList((prev) => !prev);
  };

    return (
        <React.Fragment>
            <br/>
            <TeamForm onReloadTeamList={handleReloadTeamList}/>
            <TeamList params={{player: authData.user.player.id}} reload={reloadTeamList}/>
        </React.Fragment>

    );
}

export default UserTeams;

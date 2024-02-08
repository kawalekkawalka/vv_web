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
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import {Tab} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import MatchesList from "../match/matches-list";
import TeamPerformance from "../performance/team-performance";
import PlayersIndividualPerformance from "../performance/players-individual-performance";
import TeamInvitationsList from "../team/team-invitations-list";
import TabContext from "@mui/lab/TabContext";
import MatchForm from "../match/match-form";

function UserMatches() {
    const {authData} = useAuth()
    const [tabValue, setTabValue] = useState("1");
    const [reloadMatchList, setReloadMatchList] = useState(false);

    const handleReloadMatchList = () => {
        setReloadMatchList((prev) => !prev);
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <React.Fragment>
            <TabContext value={tabValue}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleTabChange} variant="fullWidth" textColor='white'>
                        <Tab label="Ostatnie mecze" value="1"/>
                        <Tab label="Nadchodzące mecze" value="2"/>
                    </TabList>
                </Box>
                <br/>
                <MatchForm onReloadMatchList={handleReloadMatchList}/>
                <TabPanel value="1" sx={{paddingTop: '5px'}}>
                    <MatchesList params={{player: authData.user.player.id, time: "past", amount: 5}} reload={reloadMatchList}/>
                </TabPanel>
                <TabPanel value="2" sx={{paddingTop: '5px'}}>
                    <MatchesList params={{player: authData.user.player.id, time: "future", amount: 5}}reload={reloadMatchList}/>
                </TabPanel>
            </TabContext>
        </React.Fragment>

    );
}

export default UserMatches;

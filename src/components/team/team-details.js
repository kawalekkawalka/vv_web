import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useFetchTeam} from "../../hooks/fetch-team";
import Button from "@mui/material/Button";
import {useAuth} from "../../hooks/useAuth";
import {joinTeam, leaveTeam} from "../../services/team-services";
import Player from "../player/player";
import {makeStyles} from "@mui/styles";
import Comments from "../comments/comments";
import {Tab, Tabs} from "@mui/material";
import * as PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MatchesList from "../match/matches-list";
import {getTeamInvitations, sendTeamInvitation} from "../../services/team-invitations-services";
import TeamInvitationsList from "./team-invitations-list";
import {NotificationManager} from "react-notifications";
import TeamPerformance from "../performance/team-performance";
import PlayersPerformance from "../performance/players-performance";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    height: '40%',
    },
    leftSection: {
    flex: 1,
    width: '40%',
    borderRight: '2px solid white',    // This will make the left div grow to fill the available space
    },
    rightSection: {
    flex: 2,
    width: '60%',    // This will make the right div grow to fill the available space
     // Add some space between the left and right divs
    },
})


function TeamDetails() {

    const { id } = useParams();
    const [data, loading, error] = useFetchTeam(id);
    const [team, setTeam] = useState(null);
    const {authData} = useAuth()
    const [inTeam, setInTeam] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const classes = useStyles();
    const [tabValue, setTabValue] = useState("1");

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    useEffect(()=>{
        if(data?.players){
            if(authData?.user){
                setInTeam(!!data.players.find(player => player.id === authData.user.player.id));
                setIsOwner(authData.user.id === data.owner);
            }
        }
        setTeam(data);
    }, [data])

    const handleJoinTeam =  () => {
        sendTeamInvitation({user: authData.user.id, team: team.id}, authData.token).then(
            res => {console.log(res)}
        )
        NotificationManager.success("Zaproszenie wysłane");
    }

    const handleLeaveTeam =  () => {
        leaveTeam({player: authData.user.player.id, team: team.id}, authData.token).then(
            res => {console.log(res)}
        )
    }

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

  return (
  <div>
    {team && (
      <div className={classes.container}>
        <div className={classes.root}>
          <div className={classes.leftSection}>
              <h1>{team.name} </h1><h2>{team.description}</h2>
            <h2>Zawodnicy: </h2>
            <div className={classes.container}>
              {team.players.map(player => (
                <Player player={player} key={player.id} />
              ))}
            </div>
            <br />
            {authData && (
              inTeam ? (
                <Button color="primary" variant="contained" onClick={handleLeaveTeam}>Opuść zespół</Button>
              ) : (
                <Button color="primary" variant="contained" onClick={handleJoinTeam}>Dołącz do zespołu</Button>
              )
            )}
          </div>

          <div className={classes.rightSection}>
            <div>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleTabChange} variant="fullWidth" textColor='white'>
                        <Tab label="Ostatnie mecze" value="1" />
                        <Tab label="Nadchodzące mecze" value="2" />
                        <Tab label="Statystyki zespołu" value="3" />
                        <Tab label="Statystyki indywidualne" value="4" />
                          {isOwner &&
                              <Tab label="Zarządzaj zespołem (owner)" value="5" />
                          }

                      </TabList>
                    </Box>
                    <TabPanel value="1"><MatchesList params={{team: data.id, time: "past", amount: 5}}/></TabPanel>
                    <TabPanel value="2"><MatchesList params={{team: data.id, time: "future", amount: 5}}/></TabPanel>
                    <TabPanel value="3"><TeamPerformance params={{team: team.id}}/></TabPanel>
                    <TabPanel value="4"><PlayersPerformance params={{}} players={team.players}></PlayersPerformance></TabPanel>
                    <TabPanel value="5" ><TeamInvitationsList params={{team: data.id}}/></TabPanel>
                  </TabContext>
            </div>
          </div>
        </div>
        <div>
          <hr />
          <Comments comments={team.comments} objectId={team.id} contentType={'team'} />
        </div>
      </div>
    )}
  </div>
);

};

export default TeamDetails;

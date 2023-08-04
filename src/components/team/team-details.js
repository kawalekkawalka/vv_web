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
import Matches from "../match/matches";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    root: {
    display: 'flex',
    flexDirection: 'row', // This will make the divs display in a row (left and right)
    justifyContent: 'space-between', // This will add space between the divs
    alignItems: 'flex-start', // This will align the divs to the top of the container
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
        joinTeam({player: authData.user.player.id, team: team.id}, authData.token).then(
            res => {console.log(res)}
        )
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
            <h1>{team.name}: {team.description}</h1>
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
                      <TabList onChange={handleTabChange} variant="fullWidth" textColor="white">
                        <Tab label="Ostatnie mecze" value="1" />
                        <Tab label="Nadchodzące mecze" value="2" />
                        <Tab label="Statystyki zespołu" value="3" />
                        <Tab label="Statystyki indywidualne" value="4" />
                          {isOwner &&
                              <Tab label="Zarządzaj zespołem (owner)" value="5" />
                          }

                      </TabList>
                    </Box>
                    <TabPanel value="1"><Matches/></TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                    <TabPanel value="4">Item Four</TabPanel>
                    <TabPanel value="5">Item Five</TabPanel>
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

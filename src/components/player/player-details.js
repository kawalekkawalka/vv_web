import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth";
import {makeStyles} from "@mui/styles";
import Comments from "../comments/comments";
import {useFetchPlayer} from "../../hooks/fetch-player";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import {Tab} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import Avatar from "@mui/material/Avatar";
import {useFetchPerformances} from "../../hooks/fetch-performances";
import PlayerLastPerformancesTable from "../tables/player-last-performances-table";
import TeamList from "../team/team-list";
import MatchesList from "../match/matches-list";

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
    width: '30%',
    borderRight: '2px solid white',
        alignItems: 'center',
    },
    rightSection: {
    flex: 2,
    width: '70%',
    },
    avatarContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '10px',
    }
})

const positionMapping = {
  'L': 'Libero',
  'S': 'Rozgrywający',
  'OH': 'Przyjmujący',
  'OP': 'Atakujący',
  'MB': 'Środkowy',
};

function PlayerDetails() {

    const { id } = useParams();
    const [player, loading, error] = useFetchPlayer(id);
    const {authData} = useAuth()
    const classes = useStyles();
    const [tabValue, setTabValue] = useState("1");
    const [performances] = useFetchPerformances({player:id, amount:10})
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };


    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

  return (
  <div>
    {player && (
      <div className={classes.container}>
        <div className={classes.root}>
          <div className={classes.leftSection}>
              <h1>{player.name + " " +  player.surname} </h1>
              <h3>{player.nick}</h3>
              <div className={classes.avatarContainer}>
                <Avatar
                  className={classes.item}
                  alt="avatar"
                  src={player.photo}
                  sx={{ width: 200, height: 200 }}
                  variant="rounded"
                />
              </div>
              <h2>Specjalność: {positionMapping[player.position]}</h2>
              <h2>Wzrost: {player.height}cm</h2>
              <h2>Rocznik: {player.year_of_birth}</h2>
              <h2>Waga: {player.weight ? `${player.weight}kg` : '-,-'}</h2>
            <br />
          </div>
            {performances && (
              <div className={classes.rightSection}>
                <TabContext value={tabValue}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleTabChange} variant="fullWidth" textColor='white'>
                        <Tab label="Ostatnie mecze" value="1" />
                        <Tab label="Nadchodzące mecze" value="2" />
                        <Tab label="Rekordy" value="3" />
                        <Tab label="Zespoły" value="4" />

                      </TabList>
                    </Box>
                    <TabPanel value="1"><PlayerLastPerformancesTable
                        performances={performances}
                        tableName="Ostatnie występy zawodnika"/>
                    </TabPanel>
                    <TabPanel value="2"><MatchesList params={{player: id, time: "future", amount: 5}}/></TabPanel>
                    <TabPanel value="3"></TabPanel>
                    <TabPanel value="4"><TeamList params={{player: id,}}/></TabPanel>
                  </TabContext>
          </div>
            )}
        </div>
        <div>
          <hr />
          <Comments comments={player.comments} objectId={player.id} contentType={'player'} />
        </div>
      </div>
    )}
  </div>
);

};

export default PlayerDetails;

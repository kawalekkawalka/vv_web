import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useFetchTeam} from "../../hooks/fetch-team";
import Button from "@mui/material/Button";
import {useAuth} from "../../hooks/useAuth";
import {joinTeam, leaveTeam} from "../../services/team-services";
import Player from "../player/player";
import {makeStyles} from "@mui/styles";
import Comments from "../comments/comments";

const useStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',

    },
})

function TeamDetails() {

    const { id } = useParams();
    const [data, loading, error] = useFetchTeam(id);
    const [team, setTeam] = useState(null);
    const {authData} = useAuth()
    const [inTeam, setInTeam] = useState(false);
    const classes = useStyles();

    useEffect(()=>{
        if(data?.players){
            if(authData?.user){
                setInTeam(!!data.players.find(player => player.id === authData.user.player.id));
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
      <div >
          {team &&
              <React.Fragment>
                  <h1>{team.name}: {team.description}</h1>
                  <h2 >Zawodnicy: </h2>
                  <div className={classes.container}>
                      {team.players.map( player => {
                      return <Player player={player} key={player.id} />
                        } )}
                  </div>
                  <br/>
                  {inTeam ?
                      <Button color="primary" variant="contained" onClick={handleLeaveTeam}>Opuść zespół</Button>
                  :
                      <Button color="primary" variant="contained" onClick={handleJoinTeam}>Dołącz do zespołu</Button>
                  }
                  <hr/>
                  <Comments comments={team.comments} objectId={team.id} contentType={'team'}/>
              </React.Fragment>
          }
      </div>
  );
}

export default TeamDetails;

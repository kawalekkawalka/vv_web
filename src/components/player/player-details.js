import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth";
import {makeStyles} from "@mui/styles";
import Comments from "../comments/comments";
import {useFetchPlayer} from "../../hooks/fetch-player";

const useStyles = makeStyles({

})


function MatchDetails() {

    const { id } = useParams();
    const [player, loading, error] = useFetchPlayer(id);
    const {authData} = useAuth()
    const classes = useStyles();

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>



  return (
  <div>
    {player &&(
      <div className={classes.container}>
        <div>
          <hr />
          <Comments comments={player.comments} objectId={player.id} contentType={'player'} />
        </div>
      </div>
    )}
  </div>
);

};

export default MatchDetails;

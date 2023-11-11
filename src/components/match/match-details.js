import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth";
import {makeStyles} from "@mui/styles";
import Comments from "../comments/comments";
import {useFetchMatch} from "../../hooks/fetch-match";
import {DateTime} from "luxon";
import {calculateSetResults} from "../../utils";
import {useFetchPerformances} from "../../hooks/fetch-performances";

const useStyles = makeStyles({

})


function MatchDetails() {

    const { id } = useParams();
    const [match, loading, error] = useFetchMatch(id);
    const {performances} = useFetchPerformances({match:id})
    const {authData} = useAuth()
    const classes = useStyles();
    const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    const [matchTime, setMatchTime] = useState()
    const [matchScore, setMatchScore] = useState()


    useEffect(()=>{
        if(match){
            setMatchTime(DateTime.fromFormat(match.time, format));
            setMatchScore(calculateSetResults(match));
        }
    }, [match])

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

  return (
  <div>
    {match && (
      <div className={classes.container}>
        <div>
            <h2 >{match.team1_name} vs {match.team2_name} {matchScore &&
                 <div>
                     ({matchScore[0].team1score}:{matchScore[0].team2score})
                 </div>
            }
            </h2>
            <h3>{matchTime && matchTime.toFormat('yyyy-MM-dd HH:mm')}</h3>
        </div>
        <div>
          <hr />
          <Comments comments={match.comments} objectId={match.id} contentType={'match'} />
        </div>
      </div>
    )}
  </div>
);

};

export default MatchDetails;

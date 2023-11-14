import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useAuth} from "../../hooks/useAuth";
import {makeStyles} from "@mui/styles";
import Comments from "../comments/comments";
import {useFetchMatch} from "../../hooks/fetch-match";
import {DateTime} from "luxon";
import {calculateSetResults} from "../../utils";
import {useFetchPerformances} from "../../hooks/fetch-performances";
import PerformanceTable from "../performance/performance-table";

const useStyles = makeStyles({

})

function splitPerformancesByTeam(performances, team1Id, team2Id) {
  const team1Performances = performances.filter((performance) => performance.team.id === team1Id);
  const team2Performances = performances.filter((performance) => performance.team.id === team2Id);
  console.log(team1Id)
  return {
    team1Performances, team2Performances};
}


function MatchDetails() {

    const { id } = useParams();
    const [match, loading, error] = useFetchMatch(id);
    const [performances] = useFetchPerformances({match:id})
    const {authData} = useAuth()
    const classes = useStyles();
    const format = "yyyy-MM-dd'T'HH:mm:ss'Z'";
    const [matchTime, setMatchTime] = useState()
    const [matchScore, setMatchScore] = useState()
    const [team1Performances, setTeam1Performances] = useState();
    const [team2Performances, setTeam2Performances] = useState();

    useEffect(()=>{
        if(match){
            setMatchTime(DateTime.fromFormat(match.time, format));
            setMatchScore(calculateSetResults(match));
            if(performances){
                const { team1Performances, team2Performances } = splitPerformancesByTeam(
                  performances, match.team1, match.team2);
                setTeam1Performances(team1Performances);
                setTeam2Performances(team2Performances);
            }
        }
    }, [match, performances])

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

  return (
  <div>
    {match && team1Performances &&(
      <div className={classes.container}>
        <div>
            <h1 >
                <Link to={`/details/team/${match.team1}`}>{match.team1_name}</Link>
                <span> vs </span>
                <Link to={`/details/team/${match.team2}`}>{match.team2_name}</Link>
                {matchScore &&
                 <div>
                     ({matchScore[0].team1score}:{matchScore[0].team2score})
                 </div>}
            </h1>
            <h3>
                {Array.from({ length: 5 }, (_, index) => {
                    const team1Score = match[`set${index + 1}_team1_score`];
                    const team2Score = match[`set${index + 1}_team2_score`];

                    if (team1Score === 0 && team2Score === 0) {
                        return null; //
                    }

                    return (
                        <span key={index}>
                            ({team1Score}:{team2Score}){index < 4 ? ', ' : ''}
                        </span>
                    );
                })}
            </h3>
            <h3>{matchTime && matchTime.toFormat('yyyy-MM-dd HH:mm')}</h3>
        </div>
        <div>
              <PerformanceTable performances={team1Performances} tableName={match.team1_name}></PerformanceTable>
              <PerformanceTable performances={team2Performances} tableName={match.team2_name}></PerformanceTable>
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

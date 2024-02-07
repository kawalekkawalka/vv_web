import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MatchPerformanceEditTable from "../tables/match-performance-edit-table";
import Button from "@mui/material/Button";
import { NotificationManager } from "react-notifications";
import { sendPerformance } from "../../services/performance-services";
import { useAuth } from "../../hooks/useAuth";
import { useFetchMatch } from "../../hooks/fetch-match";
import Match from "../match/match";

export default function PerformanceForm() {
  const { id } = useParams();
  const [match, loading, error] = useFetchMatch(id);
  const { authData } = useAuth();
  const [team1PerformanceData, setTeam1PerformanceData] = useState();
  const [team2PerformanceData, setTeam2PerformanceData] = useState();

  useEffect(() => {
    if(team1PerformanceData){
      localStorage.setItem("team1PerformanceData", JSON.stringify(team1PerformanceData));
    }
  }, [team1PerformanceData]);

  useEffect(() => {
    if(team2PerformanceData){
      localStorage.setItem("team2PerformanceData", JSON.stringify(team2PerformanceData));
    }
  }, [team2PerformanceData]);

  const table1Data = (table1Data) => {
    setTeam1PerformanceData(table1Data);
  };

  const table2Data = (table2Data) => {
    setTeam2PerformanceData(table2Data);
  };

  const prepareData = (teamPerformanceData, matchId) => {
    const preparedData = teamPerformanceData.map(data => {
      return {
        ...data,
        match: match.id,
        team: matchId,
        player: data.id
      };
    });
    return preparedData;
  };

  const handleDataSave = () => {
    let teamPerformanceData = prepareData(team1PerformanceData || [], match.team1).concat(prepareData(team2PerformanceData || [], match.team2));
    if (teamPerformanceData.length > 0) {
      sendPerformance(teamPerformanceData, authData.token)
        .then(res => {
          console.log(res);
          NotificationManager.success("Statystyki wysłane");
        })
        .catch(error => {
          console.error(error);
          NotificationManager.error("Wystąpił błąd podczas wysyłania statystyk");
        });
    } else {
      console.error("Performance data is empty.");
    }
  };

  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="App">
      {match &&
        <div>
          <Match match={match} />
          <MatchPerformanceEditTable
              tableIndex={1}
              teamId={match.team1}
              tableData={table1Data}
          ></MatchPerformanceEditTable>
          <br />
          <MatchPerformanceEditTable
              tableIndex={2}
              teamId={match.team2}
              tableData={table2Data}
          ></MatchPerformanceEditTable>
          <br />
          <Button color="primary" variant="contained" onClick={handleDataSave}>Zapisz zmiany</Button>
        </div>
      }
    </div>
  );
}

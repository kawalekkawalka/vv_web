import React, { useEffect, useState } from "react";
import { useFetchTeams } from "../../hooks/fetch-teams";
import Paper from "@mui/material/Paper";
import { lighten } from "polished";
import Team from "../team/team";
import { getTeams } from "../../services/team-services";

function TeamList({ params, reload }) {
  const [teams, loading, error, fetchTeams] = useFetchTeams(params);
  const backgroundColor = lighten(0.05, "#282c34");

  useEffect(() => {
    fetchTeams(); // Initial fetch
  }, [params]); // Trigger fetch when params change

  useEffect(() => {
    if (reload) {
      fetchTeams(); // Trigger fetch when reload prop changes
    }
  }, [reload]);

  if (error) return <h1>Error</h1>;
  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
      {teams &&
        teams.map((team) => (
          <Paper
            key={team.id}
            elevation={3}
            sx={{
              padding: "20px",
              margin: "20px",
              backgroundColor: backgroundColor,
              color: "white",
              paddingTop: "5px",
            }}
          >
            <Team team={team} />
            {team.date_joined && team.date_left && (
              <div>
                Daty występów:{' '}
                {new Date(team.date_joined).toLocaleString('pl-PL', {
                  month: 'long',
                  year: 'numeric',
                })}{' '}
                -{' '}
                {new Date(team.date_left).toLocaleString('pl-PL', {
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            )}
            {team.date_joined && !team.date_left && (
              <div>
                Data dołączenia:{' '}
                {new Date(team.date_joined).toLocaleString('pl-PL', {
                  month: 'long',
                  year: 'numeric',
                })}
              </div>
            )}
          </Paper>
        ))}
    </div>
  );
}

export default TeamList;

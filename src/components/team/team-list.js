import React, {useState, useEffect} from "react";
import {useFetchTeams} from "../../hooks/fetch-teams";
import Paper from "@mui/material/Paper";
import {lighten} from "polished";
import Team from "./team";

function TeamList() {

    const [teams, loading, error] = useFetchTeams();
    const backgroundColor = lighten(0.05, '#282c34');
  return (
    <div>
        {teams && teams.map(team => {
            return <Paper
                          elevation={3}
                          sx={{
                            padding: '20px',
                            margin: '20px',
                            backgroundColor: backgroundColor,
                            color: 'white',
                            paddingTop: '5px'
                          }}
                        >
                            <Team team={team}></Team>
                        </Paper>
        })}
    </div>
  );
}

export default TeamList;

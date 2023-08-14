import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'
import {getTeam, getTeams} from "../../services/team-services";
import {useFetchTeam} from "../../hooks/fetch-team";
import {useFetchTeams} from "../../hooks/fetch-teams";

function TeamList() {

    const [teams, loading, error] = useFetchTeams();

  return (
    <div>
        {teams && teams.map(team => {
            return <Link to={`/details/team/${team.id}` } key={team.id}>
                <h2 >{team.name}: {team.description}</h2>
            </Link>
        })}
    </div>
  );
}

export default TeamList;

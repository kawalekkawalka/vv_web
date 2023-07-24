import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom'

function TeamList() {

    const [teams, setTeams] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      setLoading(true);
    const getData = async() => {
      await fetch('http://127.0.0.1:8000/api/teams')
          .then(resp => resp.json())
          .then( data => {
            setTeams(data);
            setLoading(false)
          }).catch( e => {
              setError(true);
          })
    }
    getData()
  }, [])

  return (
    <div>
        {teams && teams.map(team => {
            return <Link to={`/details/team/${team.id}`}>
                <h2 key={team.id}>{team.name}: {team.description}</h2>
            </Link>
        })}
    </div>
  );
}

export default TeamList;

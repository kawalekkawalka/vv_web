import React, {useState, useEffect} from "react";

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
            return <p>{team.name}: {team.description}</p>
        })}
    </div>
  );
}

export default TeamList;

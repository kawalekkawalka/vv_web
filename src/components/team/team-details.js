import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom';
import {useFetchTeam} from "../../hooks/fetch-team";
function TeamDetails() {

    const { id } = useParams();
    const [data, loading, error] = useFetchTeam(id);
    const [team, setTeam] = useState(null);

    useEffect(()=>{
        setTeam(data);
    }, [data])

    if (error) return <h1>Error</h1>
    if (loading) return <h1>Loading...</h1>

  return (
      <div>
          {team &&
              <React.Fragment>
                  <h1>{team.name}: {team.description}</h1>
                  <h2>Zawodnicy: </h2>
                  {team.players.map( player => {
                      return <div key={player.id}>
                          <p>{player.name} {player.surname}</p>
                      </div>
                  } )}
              </React.Fragment>
          }
      </div>
  );
}

export default TeamDetails;

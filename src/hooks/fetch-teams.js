import {useState, useEffect} from "react";
import {getTeam, getTeams} from "../services/team-services";

export function useFetchTeams() {

    const [teams, setTeams] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      setLoading(true);
    const getData = async () => {
          setLoading(true);
          const data = await getTeams();
          setTeams(data);
          setLoading(false)
      }
    getData()
  }, [])

  return [teams, loading, error]

}

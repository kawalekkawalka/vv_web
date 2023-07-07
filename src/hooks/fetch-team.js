import {useState, useEffect} from "react";
import {getTeam} from "../services/team-services";

export function useFetchTeam(teamId) {

    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      const getData = async () => {
          setLoading(true);
          const data = await getTeam(teamId);
          setTeam(data);
          setLoading(false)
      }
    getData()
  }, [teamId])

  return [team, loading, error]

}

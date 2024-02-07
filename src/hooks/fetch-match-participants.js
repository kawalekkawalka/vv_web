import {useState, useEffect} from "react";
import {getMatches, getMatchParticipants} from "../services/match-services";
import {getAvgTeamPerformance, getPerformances} from "../services/performance-services";

export function useFetchMatchParticipants(params) {

    const [players, setPlayers] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      setLoading(true);
    const getData = async () => {
          setLoading(true);
          const data = await getMatchParticipants(params);
          setPlayers(data);
          setLoading(false)
      }
    getData()
  }, [])

  return [players, loading, error]

}

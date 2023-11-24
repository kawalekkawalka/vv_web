import {useState, useEffect} from "react";
import {getMatches} from "../services/match-services";
import {getAvgTeamPerformance, getPerformances} from "../services/performance-services";

export function useFetchAvgTeamPerformance(params) {

    const [performances, setPerformances] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      setLoading(true);
    const getData = async () => {
          setLoading(true);
          const data = await getAvgTeamPerformance(params);
          setPerformances(data);
          setLoading(false)
      }
    getData()
  }, [])

  return [performances, loading, error]

}

import {useState, useEffect} from "react";
import {getMatch} from "../services/match-services";

export function useFetchMatch(matchId) {

    const [match, setMatch] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      const getData = async () => {
          setLoading(true);
          const data = await getMatch(matchId);
          setMatch(data);
          setLoading(false)
      }
    getData()
  }, [matchId])

  return [match, loading, error]

}

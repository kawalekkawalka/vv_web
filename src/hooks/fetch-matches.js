import {useState, useEffect} from "react";
import {getMatches} from "../services/match-services";

export function useFetchMatches(params) {

    const [matches, setMatches] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      setLoading(true);
    const getData = async () => {
          setLoading(true);
          const data = await getMatches(params);
          setMatches(data);
          setLoading(false)
      }
    getData()
  }, [])

  return [matches, loading, error]

}

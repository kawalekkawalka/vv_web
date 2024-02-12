import {useState, useEffect} from "react";
import {getMatches, getMatchParticipants, getUserFriendsMatches} from "../services/match-services";

export function useFetchUserFriendsMatches(params) {

    const [matches, setMatches] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      setLoading(true);
    const getData = async () => {
          setLoading(true);
          const data = await getUserFriendsMatches(params);
          setMatches(data);
          setLoading(false)
      }
    getData()
  }, [])

  return [matches, loading, error]

}

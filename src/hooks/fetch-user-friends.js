import {useState, useEffect} from "react";
import {getMatches, getMatchParticipants, getUserFriendsMatches} from "../services/match-services";
import {getUserFriends} from "../services/user-friendship-services";

export function useFetchUserFriends(params) {

    const [friends, setFriends] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      setLoading(true);
    const getData = async () => {
          setLoading(true);
          const data = await getUserFriends(params);
          setFriends(data);
          setLoading(false)
      }
    getData()
  }, [])

  return [friends, loading, error]

}

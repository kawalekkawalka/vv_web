import {useState, useEffect} from "react";
import {getUserFriendsInvitations} from "../services/user-friendship-invitations-services";

export function useFetchUserFriendsInvitations(params) {

    const [invitations, setInvitations] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      setLoading(true);
    const getData = async () => {
          setLoading(true);
          const data = await getUserFriendsInvitations(params);
          setInvitations(data);
          setLoading(false)
      }
    getData()
  }, [])

  return [invitations, loading, error]

}

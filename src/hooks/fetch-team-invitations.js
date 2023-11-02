import {useState, useEffect} from "react";
import {getTeamInvitations} from "../services/team-invitations-services";

export function useFetchTeamInvitations(params) {

    const [invitations, setInvitations] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      setLoading(true);
    const getData = async () => {
          setLoading(true);
          const data = await getTeamInvitations(params);
          setInvitations(data);
          setLoading(false)
      }
    getData()
  }, [])

  return [invitations, loading, error]

}

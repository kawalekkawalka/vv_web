import { useEffect, useState } from "react";
import { getTeams } from "../services/team-services";

export function useFetchTeams(params) {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeams = async () => {
    try {
      setLoading(true);
      const fetchedTeams = await getTeams(params);
      setTeams(fetchedTeams);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [params]);

  return [teams, loading, error, fetchTeams];
}

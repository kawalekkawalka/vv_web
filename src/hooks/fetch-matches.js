import { useEffect, useState } from "react";
import {getMatches} from "../services/match-services";

export function useFetchMatches(params) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const fetchedMatches = await getMatches(params);
      setMatches(fetchedMatches);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [params]);

  return [matches, loading, error, fetchMatches];
}

import { useEffect, useState } from "react";
import {getPlayers} from "../services/player-services";

export function useFetchPlayers(params) {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const fetchedPlayers = await getPlayers(params);
      setPlayers(fetchedPlayers);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [params]);

  return [players, loading, error, fetchPlayers];
}

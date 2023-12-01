import {useState, useEffect} from "react";
import {getMatches} from "../services/match-services";
import {getAvgPlayerPerformance} from "../services/performance-services";

export function useFetchAvgPlayersPerformance(params, players) {

    const [performance, setPerformances] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const performancePromises = players.map(async (player) => {
            const params = {player:player.id};
          const data = await getAvgPlayerPerformance(params);
          return data;
        });

        const performanceResults = await Promise.all(performancePromises);

        setPerformances(performanceResults);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params, players]);

  return [performance, loading, error]

}

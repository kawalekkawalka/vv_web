import {useState, useEffect} from "react";
import {getMatch} from "../services/match-services";
import {getPlayer} from "../services/player-services";

export function useFetchPlayer(playerId) {

    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      const getData = async () => {
          setLoading(true);
          const data = await getPlayer(playerId);
          setPlayer(data);
          setLoading(false)
      }
    getData()
  }, [playerId])

  return [player, loading, error]

}

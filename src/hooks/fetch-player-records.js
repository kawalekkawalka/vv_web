import {useState, useEffect} from "react";
import {getPlayerRecords} from "../services/player-records-services";

export function useFetchPlayerRecords(params) {

    const [records, setRecords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

  useEffect(()=>{
      setLoading(true);
    const getData = async () => {
          setLoading(true);
          const data = await getPlayerRecords(params);
          setRecords(data);
          setLoading(false)
      }
    getData()
  }, [])

  return [records, loading, error]

}

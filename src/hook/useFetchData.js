import {useEffect, useState} from "react";

function useFetchData(api, params) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loading) return;
    fetchData();
  }, [params]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api(params);
      setData(response.data);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  return {data, loading, error};
}

export default useFetchData;
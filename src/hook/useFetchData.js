
import { useEffect, useState } from 'react';
import axios from 'axios';

function useFetchData(api) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await api();
            setData(response.data);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // 초기 로드 시 데이터 가져오기

    return { data, loading, error, fetchData };
}

export default useFetchData;


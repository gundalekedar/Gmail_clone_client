// it is a custom hook
// this custom hook is used for made a middleware to handle a api
import { useState } from 'react';
import API from '../services/api'

const useAPi = (urlObject) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const call = async (payload ,type='') => {
        setResponse(null);
        setError("");
        setIsLoading(true);

        try{
            let res = await API(urlObject,payload ,type);
            setResponse(res.data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return { call, response, error, isLoading };
}

export default useAPi;
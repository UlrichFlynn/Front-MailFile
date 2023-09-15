import { useState, useEffect } from "react";

const useFetch = (url) => {

    const BASE_URL = "http://localhost:7020/api";
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchData() {
            try{
                const response = await fetch(BASE_URL + url, { signal: abortController.signal });
                if(!response.ok) throw Error("An error occured");
                const result = await response.json();
                if (result.type === "error") {
                  setError(result.message);
                }
                else {
                  setData(result.data);
                  setError(null);
                }
                setIsPending(false);
            }
            catch(error){
                setError("An error has occured. Please try again later");
                setIsPending(false);
            };
        }
        fetchData();

        return () => abortController.abort();
    }, [url]);

    return { data, isPending, error };
}

export default useFetch;
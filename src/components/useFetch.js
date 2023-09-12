import { useState, useEffect } from "react";

const UseFetch = (url, method, body) => {

    const BASE_URL = "http://localhost:7020/api";
    const [result, setResult] = useState();

    useEffect(() => {
        const abortController = new AbortController();

        async function fetchData() {
            try{
                const response = await fetch(BASE_URL + url, {
                    signal: abortController.signal,
                    method,
                    headers: method === 'POST' ? { "Content-Type": "application/json" } : {},
                    body: method === 'POST' ? JSON.stringify(body) : ''
                });
                if(!response.ok) throw Error("An error occured");
                console.log("RESPONSE: ", response);
                const data = await response.json();
                setResult(data);
            }catch(error){
                if(error.name === "AbortError") {
                    console.log('Request aborted');
                }
                return {
                    type: "error",
                    message: "Request aborted"
                }
            };
        }
        fetchData();

        return () => abortController.abort();
    }, [url, method, body]);

    return result;
}

export default UseFetch;
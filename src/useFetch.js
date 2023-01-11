import {useState, useEffect} from 'react';

const useFetch = (url) => {

    const [data,setData] = useState(null);
    const [isPending,setIsPending] = useState(true);
    const [error,setError] = useState(null);

    useEffect(()=>{

        const abortCont = new AbortController(); //To stop fetch for the unmounted component.

        fetch(url, {signal: abortCont.signal}) //associating AbortController with the fetch request.

        .then((res) => {
            if(!res.ok){
                throw Error("Failed to fetch data for the resource");
            }
            //console.log(res);
            return res.json();
        })
        .then ((data)=>{
            //console.log(data);
            setData(data);
            setIsPending(false); 
            setError(null); /* To remove previous error message (If exist) for subsequent requests.*/
        })
        .catch((err)=> {
            if (err.name === "AbortError") { //prevent state update on AbortError
                console.log("Request aborted"); 
            }else{
                setIsPending(false); /*To remove loading message on getting an error*/
                setError(err.message)
            }
        }); 

        return () => abortCont.abort(); // to abort whatever fetch is associated with the fetch request.

    },[url]);

    return {data,isPending, error}; //to return state properties as js object

}

export default useFetch;
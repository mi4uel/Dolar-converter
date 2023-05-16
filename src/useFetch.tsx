import {useState, useEffect} from 'react'

//type of the state is a generic defined on App
type UseFetchState<T> = {
    state: "idle" | "loading" | "error" | "success",    // diferent state
    data: null |T,                                      // null or generic
    error: null | Error                                 // null or error
}

function useFetch<T>(url:string){                                       // function is a generic type and url is a string 
    const [fetchState, setFetchState] = useState<UseFetchState<T>>({    //state is a type defined above
        state:"idle",
        data: null,
        error:null
    })
    
    useEffect(()=>{
       const fetchData = async ()=>{
        try {
            setFetchState((oldValue)=>({        // set loading before making the fetch
            ...oldValue,
            state: "loading"
            }))
            const response = await fetch(url)       // fetch
            if(response.ok){
                const json = await response.json()  //   if ok convert to json
                setFetchState((oldValue)=>({        // change state, data and error
                    ...oldValue,
                    state: "success",
                    data:json,
                    error:null
                })) 
            }else{
                setFetchState((oldValue)=>({    // set error
                    ...oldValue,    
                    state: "error",
                    data:null,
                    error:new Error(response.statusText)
                }))  
            }
        } catch (error) {
            setFetchState((oldValue)=>({    // same, set error
                ...oldValue,
                state: "error",
                data:null,
                error:error as Error
            }))  
        }
       }
       fetchData()
    },[url])

    return fetchState;      // return state

}

export default useFetch
import { useEffect, useState,useCallback } from "react";

async function sendHttpRequest(url,config){
  const response = await fetch(url,config)
  const resData = await response.json();
  
  if(!response.ok){
    throw new Error( resData.message ||'something went wrong, failed to send request')
  }
  return resData;
}



function useHttp(url,config,initialValue){

  const [data,setData]=useState(initialValue);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState('')

  function clearData(){
    setData(initialValue)
  }

  const sendRequest = useCallback(async function sendRequest(data){
      setIsLoading(true)
      try{
        const resData =   await sendHttpRequest(url,{...config,body:data})
        setData(resData)
      }catch(error){
        setError(error.message)
      }
      setIsLoading(false)
      },[url,config])  

    // to prevent infine loop inside useeffect hook, we have to used useCallback for sendRequest  
    useEffect(() => {
      if((config && (config.method ==='GET' || !config.method )) || !config){
        console.log('fetch api using get method only')
        sendRequest()
      }
    },[sendRequest,config])

  return {
    data,
    error,
    isLoading,
    clearData,
    sendRequest
  }

}
export default useHttp;
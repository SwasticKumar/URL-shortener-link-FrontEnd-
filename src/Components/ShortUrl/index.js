import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { redirectURL } from '../../Services/APIservices';

function ShortURL() {
    const {urlID} = useParams();
    async function handleRedirect(urlID){
        const response = await redirectURL(urlID);
        return response; 
      }
    useEffect( ()=> {
        if(urlID){
        handleRedirect(urlID);
        }
    },[urlID])
  return (
    <>
    </>
  )
}

export default ShortURL
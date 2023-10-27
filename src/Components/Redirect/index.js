import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios"
import { useGlobalContext } from '../../Context/context';

function Redirect() {
    const {id} = useParams(); 
    const {serverURL} = useGlobalContext();
    const getData = async(id) => {
    try{
      const response = await axios.get(`${serverURL}/${id}`)
      //console.log(response);
      window.location.href = response.data.longURL;
    }
    catch(err){
      window.alert("Invalid URL")
    }
   
  }
  useEffect(  ()=> {
    getData(id);
  },[])
  return (
    <div className='m-5'>You are being redirected...</div>
  )
}

export default Redirect;
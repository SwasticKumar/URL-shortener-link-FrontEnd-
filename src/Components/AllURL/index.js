import React from 'react'
import { useEffect, useState } from 'react';
import { getAllURL, updateURLCount } from '../../Services/APIservices';
import { useGlobalContext } from "../../Context/context";

function AllURL() {
  const [urlList, setURLlist] = useState([]);
  const {isLogged, currentUser} = useGlobalContext();
  
  const getAll = async(data,config) => {
    console.log("get all url fn");
    try{
      const response = await getAllURL(data,config);     
        if( response.status === 200){
          //console.log(response.data.data);
          setURLlist([...response.data.data])
        }
    }
    catch(err){
      window.alert("Network error")
      console.log("error", err);} 
  }

  const updateURLCountDB = async(data,config) => {
    console.log("get updated click");
    try{
      const response = await updateURLCount(data,config);     
        if( response.status === 200){
          //console.log(response.data.data);
          let id= response.data.data.value.urlID;
          let clickcount = response.data.data.value.clicked;
          //console.log(urlList);
          setURLlist(urlList.map((el)=> {
            if(el.urlID === id) 
            { return {...el, clicked :clickcount }
            }
          else 
          { return el}
        }))
        //console.log(arr);
        }      
    }
    catch(err){
      window.alert("Network error")
      console.log("error", err);} 
  }
  
  async function handleCount(e){
    console.log("url clicked");
    let tokenAuth = localStorage.getItem("tokenAuth");
    const config = { headers : {"x-auth-token" : tokenAuth}}
    const data = {id:e.target.id} 
    updateURLCountDB(data,config);
  }
 
  useEffect(()=> {
    let tokenAuth = localStorage.getItem("tokenAuth");
    const config = { headers : {"x-auth-token" : tokenAuth}}
    let loggedUser = localStorage.getItem("loggedUser");
    //console.log(currentUser, tokenAuth,loggedUser);

    let data = {email: loggedUser}
    if(loggedUser || tokenAuth !== null){
    getAll(data,config);
    }
    else {
      console.log("log in to continue");
      window.alert("log in to continue")
    }
  },[isLogged,currentUser])
  return (
    <>
      <h4 className=" text-decoration-underline mb-3"> All URLs </h4> 
      <div className='d-flex flex-column justify-content-center align-items-center flex-wrap'>
        <h5>Total URLs created by user : {urlList.length}</h5>
        <div className=' w-75 overflow-auto'>

      { urlList.length &&
        <table className="table table-success table-striped table-responsive-md mt-3  "> 
        <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Date</th>
        <th scope="col">Short URL</th>
        <th scope="col">clicked</th>
        <th scope="col">LongURL</th>
      </tr>
    </thead>
    <tbody>
        { urlList.map((el,i) => 
        <tr key={el.urlID}>
           <th scope="row">{i+1}</th>
           <td>{el.createdOn}</td>
          <td><a id={el.urlID} className='text-decoration-none' href={`/${el.urlID}`} onClick={handleCount} target="_blank" rel="noreferrer" >{el.shortURL}</a> </td>
          <td>{el.clicked}</td>
          <td title={el.longURL}>{el.longURL.substring(0,20)+"..."} </td>
        </tr>
        )}
        </tbody>
        </table>
      }     
      </div> 
      </div> 
    </>
  )
}

export default AllURL;
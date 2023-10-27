import React, { useEffect, useState } from 'react';
import {  createURL, updateURLCount } from '../../Services/APIservices';
import LogButton from '../LogButton';

function CreateURL() {

  const [urlData, setURLData] = useState({});
  const [longURL, setLongURL] = useState([]);
  const [error, setError] = useState("")

  const createUrlDB = async(data,config) => {
    console.log("create url fn");
    try{
      const response = await createURL(data,config);
          if( response.status === 200){
          //console.log(response.data);
          setURLData({...response.data.data}) 
          window.alert("Short URL created")
        }
           
    }
    catch(err){console.log("error", err)} 
  }

  const updateURLCountDB = async(data,config) => {
    console.log("get updated click");
    try{
      const response = await updateURLCount(data,config);     
        if( response.status === 200){
          //console.log(response.data.data);
          //let id= response.data.data.value.urlID;
          let clickcount = response.data.data.value.clicked;
          setURLData({...urlData, clicked :clickcount })
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
 function handleSubmit(e){
    e.preventDefault();
    let tokenAuth = localStorage.getItem("tokenAuth");
    const config = { headers : {"x-auth-token" : tokenAuth}}
    let loggedUser = localStorage.getItem("loggedUser");

    //console.log(currentUser,tokenAuth, loggedUser);

    if(loggedUser || tokenAuth !== null){
      const currentDate = new Date();
      const date = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      if(month<10)
        month = '0'+month;
      // show in specific format
      let monthDateYear = String(year)+ String(month)+String(date);

      let data = {user: loggedUser, longURL:longURL, createdOn: monthDateYear}
      createUrlDB(data,config);
    }
    else{
      setError("log in to continue")
      window.alert("log in to continue")
    }

  }
  useEffect( () =>{
    let tokenAuth = localStorage.getItem("tokenAuth");
    if(!tokenAuth){
      window.alert("log in to continue")
    }
  })

  return (
    <>
     {/* <LogButton/> */}
      <h5 className="urlheading mb-3"> Short URL </h5> 
      <div className="container-fluid my-3 ">
        <div className="d-flex justify-content-center align-items-center flex-lg-row">
        <div className=" border border-dark rounded col-sm-10 col-md-8 col-lg-8 bg-white p-3 ">
            
            <form onSubmit={handleSubmit}>
                <div className="my-3">
                <label>
                    Enter long URL:
                </label>
                <br></br>
                <input type="text" onChange={(e) => setLongURL(e.target.value)} required></input>
                </div>
                <button type="submit" className="btn btn-sm btn-primary mt-3">Create Short URL</button>
            </form>
            {error && <h6 className="m-3 text-danger text-break"> {error} </h6>} 
            </div>-
        </div>
        </div>
        <div className='d-flex flex-row justify-content-center'>
        { urlData &&
        <table className="table table-success table-striped table-responsive-sm w-75"> 
        <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Date</th>
        <th scope="col">URL ID</th>
        <th scope="col">Short URL</th>
        <th scope="col">clicked</th>
        <th scope="col">LongURL</th>
      </tr>
    </thead>
    <tbody>
        <tr key={urlData._id}>
           <th scope="row">1</th>
          <td>{urlData.createdOn}</td>
          <td>{urlData.urlID}</td>
          <td><a id={urlData.urlID} href={`/${urlData.urlID}`} onClick={handleCount} target="_blank" rel="noreferrer" >{urlData.shortURL}</a></td>
          <td> {urlData.clicked} </td>
          <td className='text-break'> {urlData.longURL} </td>
        </tr>
        </tbody>
        </table>
      }
      </div>
    </>
  )
}

export default CreateURL;
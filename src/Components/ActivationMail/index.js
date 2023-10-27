import React from 'react';
import { useState } from "react";
import { activationMail } from '../../Services/APIservices';
import { useNavigate } from "react-router-dom";
import LogButton from '../LogButton';

const ActivationMail = () => {

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);
  
  const activationMailDB = async(email) => {
      const response = await activationMail({email:email});
      return response;
  }
  
  function handleSignup(e){
    navigate('/signup');
}
  function handleSubmit(e){
      e.preventDefault(); 
      setMsg(true);
      //console.log(email); 
      const response = activationMailDB(email)
      response
      .then((res)=>{
          if(res.status === 200) {
              console.log(res.data)
              navigate('/sent');
          }  
      } )
      .catch((err)=> {
        console.log(err)
        window.alert(err.response.data.message)
    })
  }

  return (
    <> 
    {/* <div className="d-flex justify-content-end align-items-end mt-3"> 
                <button className="btn btn-info m-3" onClick={handleSignup}>Sign Up</button>
                <LogButton/>
        </div>  */}
    <div className="container-fluid my-3 ">
    <div className="d-flex justify-content-center align-items-center flex-lg-row">
    <div className=" border border-dark rounded bg-white p-5 ">
        <h5 className=" p-2">Re-send Activation Mail</h5>
        <form onSubmit={handleSubmit}>
            <div className="form-outline m-4">
            <label className="form-label mx-2 p-2 fw-bold" >Enter Email address:</label>
            <input type="email"  className="form-control m-2 border border-secondary-subtle" onChange={(e) => setEmail(e.target.value)} required></input>
            </div>
            <button type="submit" className="btn btn-sm btn-primary m-3">Send Activation Link</button>
        </form>
        {msg && <p>Processing request.. Please wait..</p>}
    </div>
    </div>
    </div>    
    </>
  )
}

export default ActivationMail;
import React, { useEffect, useState } from 'react'
import {useParams, useSearchParams, useNavigate} from 'react-router-dom';
import { activateAccount } from '../../Services/APIservices';

function ActivateAccount() {
    const {id} = useParams()
    const [searchparam] = useSearchParams();
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const activateUser = async(id,token,payload) => {
        console.log("Verifying activation");
        try{
         const response = await activateAccount(id,token,payload)
         console.log(response);
            if(response.status === 200){
                console.log(response.data);
                setMsg("success - account activated")
                //let resetID = response.data.decode;
                window.alert("Account activated successfully. Login")
                navigate(`/login`);
             }
         
         else {
            console.log("error activating");
            let errmsg = "error activating"
            setMsg(errmsg)
            window.alert("error activating account")
         }
         
        }
        catch(err){
            console.log("error authorizing");
            console.log(err.response) 
            let errmsg = "Activation link invalid"
            setMsg(errmsg)
            window.alert("Activation link invalid")
        }
    }   

    useEffect( ()=> {
      const token  = searchparam.get("activateToken") 
      console.log("calling fn");
      if(id && token) {
        activateUser(id,token, {isActivated : true});
      }
    },[id, searchparam])
  return (
    <div> 
        <h5 className='my-5'>Activate Account</h5>
         <div className="text-blue mx-auto my-5">
        <h6>Verifying user authorization. Please wait .. </h6> 
        {msg && <h6 className="my-3 text-danger">{msg}</h6>}
        </div>
    </div>
  )
}

export default ActivateAccount
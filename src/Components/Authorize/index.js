import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyAuthorization } from "../../Services/APIservices";

const Authorize = () => {  
    const [searchparam] = useSearchParams();
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    const verifyUser = async(id,token) => {
        //console.log(id,token);
        console.log("Verifying authorization");
        try{
         const response = await verifyAuthorization(id,token)
         if(response.status === 200){
           // console.log(response, response.data.decode.id);
            let resetID = response.data.decode.id;
            navigate(`/reset/${resetID}`);
         }
        }
        catch(err){
            console.log("error authorizing", err);
           // console.log(err.response.data) 
            let errmsg = err.response.data.message+": "+ (err.response.data.error.name ? err.response.data.error.name : "");
            setMsg(errmsg)
            window.alert("Password Reset link expired")
        }
        
    }   
    useEffect(()=> {
       const id = searchparam.get("id")
      const token  = searchparam.get("token") 
      if(id && token) {
        verifyUser(id,token);
      }
       else {
        window.alert("Password Reset link is invalid")
       }
    },[searchparam])
    return(
        <div className="text-white mx-auto my-5">
        <h6>Verifying user authorization. Please wait .. </h6> 
        {msg && <h6 className="text-danger">{msg}</h6>}
        </div>
    )
}
export default Authorize;
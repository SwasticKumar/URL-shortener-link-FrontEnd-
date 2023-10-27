import React from 'react'
import'./login.css'
import { useState } from "react";
import { userLogin } from '../../Services/APIservices';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/context";

const Login = () => {
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); 
    const {setIsLogged, setCurrentUser} = useGlobalContext();

    const verifyLoginDB = async(payload) => {
        const response = await userLogin(payload);
        return response; 
    }
    function handleForgot(e){
        localStorage.removeItem("tokenAuth");
        localStorage.removeItem("loggedUser");
        localStorage.removeItem("loggedUsername");
        localStorage.removeItem("loggedUserID");
        setIsLogged(false);
        setCurrentUser({})
        navigate('/forgot-password');
    }
    // function handleSignup(e){
    //     navigate('/signup');
    // }
    function handleActivation(e){
        navigate('/activation');
    }
    function handleSubmit(e){
        e.preventDefault(); 
        const response = verifyLoginDB({email: email, password: pwd})
        response
        .then((res) => {
            if(res.status === 200){
                //console.log(res.data); 
                setSuccess(true)
                setError("");
                const user = {...res.data.data}
                setCurrentUser({...user})
                const token = res.data.token;
                localStorage.setItem("tokenAuth", token);
                localStorage.setItem("loggedUser", user.email);
                localStorage.setItem("loggedUsername", user.fname);
                localStorage.setItem("loggedUserID", user.id);
                setIsLogged(true);
                navigate('/dashboard-url');
            }
        })
        .catch((err) => {
            setError(err.response.data.message)
            setSuccess(false)
            console.log(err);
        })
     
    }
    return(
        <>
        {/* <div className="d-flex justify-content-end align-items-end mt-3"> 
                <button className="btn btn-info m-3" onClick={handleSignup} id="signup">Sign Up</button>
                
        </div>  */}
        <div className="container ">
        <div className="col-lg-7 text-center text-lg-start">
          
          {/* backgroud video */}
          <video muted loop autoPlay src="./image/lib book.mp4"></video>
 
         </div>
        <div className=" d-flex justify-content-center align-items-center flex-lg-row">
        <div className="border border-dark rounded  col-md-8 col-lg-5 bg-f p-5 ">
            <h5 className="mb-3 fs-1" id="head"> Login </h5> 
            <form onSubmit={handleSubmit}>
                <div className="my-3 px-1 ">
                {/* <label id="label1">
                    Enter email:
                </label> */}
                <br></br>
                <input type="email" 
                className='p-2 rounded-2'
                placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} required></input>
                </div>
                <div className="my-2">
                {/* <label id="label2">
                    Enter Password:
                </label> */}
                <br></br>
                <input type="password" 
                className='p-2 rounded-2'
                placeholder='Enter your Password'
                onChange={(e) => setPwd(e.target.value)} required></input>
                </div>
                <button type="submit" className="btn btn-lg bt-b text-dark mt-3" style={{ background: "#edf3f8"}} id="login">Login</button>
            </form>
            {error && <h6 className="m-3 text-danger text-break"> {error} </h6>}
            {success && <h6 className="m-3 text-success text-break"> Login credentials valid !! </h6>}
            </div>
        </div>
        <div className="mt-3"> 
               <button className="btn btn-sm fs-5 mx-3 px-4 btn-color text-white mt-3" onClick={handleForgot}>Forgot Password?</button>
       
        <span className="mt-3"> 
               <button className="btn btn-sm fs-5 mx-3 btn-color text-white mt-3 " onClick={handleActivation}>Account not activated?</button>
        </span> 
        </div> 
        </div>
        </>
    )
}
export default Login;
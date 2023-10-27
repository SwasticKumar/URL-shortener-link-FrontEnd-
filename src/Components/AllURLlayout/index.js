import React from 'react'
import LogButton from '../LogButton';
import AllURL from '../AllURL';
import { useNavigate } from "react-router-dom";

function AllURLlayout() {
    const navigate = useNavigate();

    function handleCreate(e){
        navigate('/create-url');
      }
  return (
    <div className="container-fluid">
    <div className="d-flex justify-content-end align-items-end mt-3"> 
    <button className="btn btn-info m-3" onClick={handleCreate}>Create URL</button>
    {/* <LogButton/> */}
    </div> 
    <AllURL />
    </div>
  )
}

export default AllURLlayout;
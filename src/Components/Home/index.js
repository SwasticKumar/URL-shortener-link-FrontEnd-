import React from "react";
import LogButton from "../LogButton";

function Home() {
  return (
    <>
      <div className="col-lg-7 text-center text-lg-start">
        {/* backgroud video */}
        <video muted loop autoPlay src="./image/signup.mp4"></video>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h5 className="m-5 text-break urlheading">
          Welcome to URL shortener App
        </h5>
        {localStorage.getItem("loggedUsername") && (
          <h5 className="my-2">
            Hi {localStorage.getItem("loggedUsername")} !
          </h5>
        )}
        {!localStorage.getItem("loggedUsername") && (
          <h5 className="my-2">Log in to use the app.</h5>
        )}
        <LogButton />
      </div>
    </>
  );
}
export default Home;

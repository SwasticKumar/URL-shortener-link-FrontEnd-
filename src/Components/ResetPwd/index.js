import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../../Services/APIservices.js";

const ResetPwd = () => {
  const { id } = useParams();
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const resetPwdDB = async (id, payload) => {
    console.log("resetting pwd");
    const response = await resetPassword(id, payload);
    return response;
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (pwd === pwd2) {
      setError(false);
      console.log("reset");
      const response = resetPwdDB(id, { password: pwd });
      response
        .then((res) => {
          if (res.status === 200) {
            setSuccess(true);
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        })
        .catch((err) => {
          console.log("Error resetting password", err);
        });
    } else {
      setError(true);
    }
  }
  return (
    <>
    <div className="bg-color">
      <div className="container m-4 ">
        <div className="col-lg-7 text-center text-lg-start">
          {/* backgroud video */}
          <video muted loop autoPlay src="./image/signup.mp4"></video>
        </div>
        <div className="d-flex justify-content-center align-items-center flex-lg-row">
          <div className="border border-dark rounded  col-md-8 col-lg-5 bg-f p-5">
            <h5 className="fs-1 mb-3">Reset Password </h5>
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                {/* <label>Enter New Password:</label> */}
                <br></br>
                <input
                  type="password"
                  className="p-2 rounded-2"
                  placeholder="Enter New Password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                ></input>
              </div>
              <div className="my-2">
                {/* <label>Confirm New Password:</label> */}
                <br></br>
                <input
                  type="password"
                  className="p-2 rounded-2"
                  placeholder="Confirm New Password"
                  onChange={(e) => setPwd2(e.target.value)}
                  required
                ></input>
              </div>
              <button
                type="submit"
                className="btn btn-lg bt-b text-dark mt-3"
                style={{ background: "#edf3f8" }}
              >
                Submit
              </button>
            </form>
            {error && (
              <h6 className="m-3 text-danger text-break">
                Password do not match. Please try again.
              </h6>
            )}
            {success && (
              <h6 className="m-3 text-success text-break">
                Password reset successfully !!{" "}
              </h6>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default ResetPwd;

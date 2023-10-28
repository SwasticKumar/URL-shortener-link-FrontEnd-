import { Link } from "react-router-dom";
import "./header.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
const Header = () => {
  // Function to handle logout
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("loggedUser");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    //         <nav className="navbar navbar-expand-md text-white ">
    //    <div className="container-fluid">
    //     <NavLink className="navbar-brand border border-dark fw-bold fst-italic p-1" to={"/login"} > </NavLink>
    //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //       <span className="navbar-toggler-icon"></span>
    //     </button>
    //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //         <li className="nav-item">
    //           <NavLink className="nav-link text-white" aria-current="page" to="/login">Login</NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink className="nav-link text-white" to="/signup">Sign Up</NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink className="nav-link" to="/dashboard-url">Dashboard</NavLink>
    //         </li>
    //         {/* <li className="nav-item">
    //           <NavLink className="nav-link" to="/create-url">Create URL</NavLink>
    //         </li>
    //         <li className="nav-item">
    //           <NavLink className="nav-link" to="/all-url">All URLs</NavLink>
    //         </li>  */}

    //       </ul>
    //     </div>
    //   </div>

    // </nav>
    <nav className="navbar navbar-expand-lg navbar-light bg-n">
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" to={"/"}>
          <img
            src="./image/url-logo.png"
            alt="logo"
            style={{ width: "3.5rem" }}
          />
        </Link>

        <ul className="navbar-nav ms-auto mb-lg-0 mx-4 fs-5 ">
          <li className="nav-item ">
            <Link
              style={{ textDecoration: "none" }}
              className="text-white mx-4 fs-3"
              to="/signup"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item ">
            <Link
              style={{ textDecoration: "none" }}
              className="text-white  fs-3"
              to="/dashboard-url"
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="text-white mx-4 fs-3" to="/login">
              <i class="fas fa-home"></i>
            </Link>
          </li>
          <li className="nav-item"></li>
          <li className="nav-item">
            <Link
              to="/login"
              className="fs-3 text-white"
              onClick={handleLogout}
            >
              <i class="fa-solid fa-power-off "></i>
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              variant="link"
              className="logout-icon  fs-4 mx-4  text-white"
              
            >
              <i class="fa-solid fa-power-off"></i>
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import "./Sidebar.scss";

export default function Sidebar(props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  // const { currentUser, logout } = useAuth();
  const history = useHistory();

  // async function handleLogout() {
  //   setError("");

  //   try {
  //     await logout();
  //     history.push("/login");
  //   } catch {
  //     setError("Failed to log out");
  //   }
  // }

  return (
    <>
      <div id="mySidebar" className={`sidebar ${open ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setOpen(false)}>
          x
        </button>
        <div className="sidebar-wrapper">
          <Link to="/welcome">
            <button className="home-btn">home</button>
          </Link>
        </div>
      </div>
      <div className={`${open ? "sidebar-open" : ""}`}>
        <button
          className="openbtn"
          onClick={() => {
            setOpen(!open);
          }}
        >
          MENU
        </button>
        {props.children}
      </div>
    </>
  );
}

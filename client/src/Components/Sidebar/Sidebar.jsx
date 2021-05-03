import { useState } from "react";
import "./Sidebar.scss";

export default function Sidebar(props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div id="mySidebar" className={`sidebar ${open ? "open" : ""}`}>
        <button className="closebtn" onClick={() => setOpen(false)}>
          x
        </button>
        <a href="#">Home</a>
        <a href="#">About</a>
      </div>
      <div className={`${open ? "sidebar-open" : ""}`}>
        <button
          className="openbtn"
          onClick={() => {
            setOpen(!open);
          }}
        >
          Open Sidebar
        </button>
        {props.children}
      </div>
    </>
  );
}

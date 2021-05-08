import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import logo from "../../Assets/images/logo.svg";
import "./Template.scss";

export default function Template() {
  return (
    <>
      <div className="box">
        <div className="rot">
          <Link to={`/haiya/${uuidV4()}`}>
            <img className="card-img" src={logo} />
          </Link>
        </div>
      </div>
    </>
  );
}

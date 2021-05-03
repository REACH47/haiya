import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div>
      <h1>Welcome</h1>
      <h3>Login</h3>
      <h4>
        Don't have an account? <Link to="/signup">Sign Up!</Link>
      </h4>
    </div>
  );
}

export default Welcome;

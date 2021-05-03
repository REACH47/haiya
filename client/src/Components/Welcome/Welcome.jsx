import React from "react";
import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div>
      <h1>Haiya!</h1>
      <Link to="/signup">
        <h3>Get Started</h3>
      </Link>
      <h4>
        Already have an account? <Link to="/login">Log In!</Link>
      </h4>
    </div>
  );
}

export default Welcome;

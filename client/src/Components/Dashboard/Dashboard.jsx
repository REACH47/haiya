import React, { useState } from "react";
import Template from "../Template/Template";
import { motion } from "framer-motion";
import { Card, Button, Alert, Image } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import letters from "../../Assets/background/letters.mp4";
import logo from "../../Assets/images/logo.svg";
import "../Dashboard/Dashboard.scss";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <motion.div
      initial={{ opactiy: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="dashboard">
        <div>
          <video playsinline autoPlay muted loop>
            <source src={letters} type="video/mp4" />
          </video>
        </div>
        <Card.Body>
          <div>
            <Image className="ml-3 mb-4" src={logo} />
          </div>
          {error && <Alert variant="dark">{error}</Alert>}
          <div className="mt-3 ml-5 mb-2">
            <h2 className="dashboard__user">
              Haiya, <strong>{currentUser.email}</strong>!
            </h2>
          </div>
          <Link to="/update-profile" className="btn btn-dark w-15 mt-2 ml-4">
            Update Profile
          </Link>
          <Button
            className="w-15 text-center mt-2 ml-3"
            variant="dark"
            onClick={handleLogout}
          >
            Good Bye!
          </Button>
        </Card.Body>
      </div>
      <div>
        <Template />
      </div>
    </motion.div>
  );
}

import React, { useState } from "react";
import Template from "../Template/Template";
import { v4 as uuidV4 } from "uuid";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import letters from "../../Assets/background/letters.mp4";

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
    <>
      <div>
        <div>
          <video playsinline autoPlay muted loop>
            <source src={letters} type="video/mp4" />
          </video>
        </div>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="dark">{error}</Alert>}
          Haiya, <strong>{currentUser.email}</strong>!
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </div>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Good Bye!
        </Button>
      </div>

      <div>
        <Template />
      </div>
    </>
  );
}

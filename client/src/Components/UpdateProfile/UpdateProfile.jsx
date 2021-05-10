import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import letters from "../../Assets/background/letters.mp4";
import "../UpdateProfile/UpdateProfile.scss";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    } else if (passwordRef.current.value.length <= 5) {
      return setError("Passwords must be at least 6 characters");
    }

    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/dashboard");
      })
      .catch(() => {
        setError("Failed to update profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <motion.div
      initial={{ opactiy: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <div>
          <video playsinline autoPlay muted loop>
            <source src={letters} type="video/mp4" />
          </video>
        </div>
        <Card.Body>
          <h1 className="text-center mb-4 update-title">update your profile</h1>
          {error && <Alert variant="dark">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="text-left" id="email">
              <Form.Label className="label">email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>

            <Form.Group className="text-left" id="password">
              <Form.Label className="label">password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same password"
              />
            </Form.Group>

            <Form.Group className="text-left" id="password-confirm">
              <Form.Label className="label">password confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same password"
              />
            </Form.Group>

            <Button
              disabled={loading}
              variant="dark"
              className="w-100 button"
              type="submit"
            >
              update
            </Button>
            <div className="w-100 text-center mt-2">
              <Link className="btn btn-dark w-100 button" to="/dashboard">
                cancel
              </Link>
            </div>
          </Form>
        </Card.Body>
      </div>
    </motion.div>
  );
}

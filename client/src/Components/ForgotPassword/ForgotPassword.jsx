import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import mono from "../../Assets/background/mono-bg.mp4";
import logo from "../../Assets/images/logo.svg";
import "../../Components/ForgotPassword/ForgotPassword.scss";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your email for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <motion.div
      initial={{ opactiy: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <div>
          <video playsinline autoPlay muted>
            <source src={mono} type="video/mp4" />
          </video>
        </div>
        <Card.Body>
          <img className="ml-3 mb-0" src={logo} />
          <h2 className="text-center mb-4">reset password</h2>
          {error && <Alert variant="dark">{error}</Alert>}
          {message && <Alert variant="dark">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="text-left" id="email">
              <Form.Label className="label">Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button
              variant="dark "
              disabled={loading}
              className="w-100 button"
              type="submit"
            >
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3 account-text">
            <Link className="log-in" to="/login">
              log in
            </Link>
          </div>
        </Card.Body>
      </div>
      <div className="w-100 text-center mt-2 account-text">
        <h4>need an account ?</h4>
        <Link className="signup-link" to="/signup">
          <section class="animation">
            <a>
              <span className="text">sign up</span>
              <span className="line -right"></span>
              <span className="line -top"></span>
              <span className="line -left"></span>
              <span className="line -bottom"></span>
            </a>
          </section>
        </Link>
      </div>
    </motion.div>
  );
}

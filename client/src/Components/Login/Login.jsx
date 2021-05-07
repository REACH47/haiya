import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import mono from "../../Assets/background/mono-bg.mp4";
import logo from "../../Assets/images/logo.svg";
import "../../Components/Login/Login.scss";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/dashboard");
    } catch {
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <>
      <div>
        <div>
          <video playsinline autoPlay muted>
            <source src={mono} type="video/mp4" />
          </video>
        </div>
        <Card.Body>
          <img className="ml-3 mb-0" src={logo} />
          <h2 className="text-right mb-4">log in</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="text-left" id="email">
              <Form.Label className="label">email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group className="text-left" id="password">
              <Form.Label className="label">password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button
              variant="dark"
              disabled={loading}
              className="w-100 button"
              type="submit"
            >
              log in
            </Button>
          </Form>
          <div className="w-100 text-center mt-3 account-text">
            <Link className="forgot-password" to="/forgot-password">
              forgot password ?
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
    </>
  );
}

import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import mono from "../../Assets/background/mono-bg.mp4";
import logo from "../../Assets/images/logo.svg";
import "../../Components/Signup/Signup.scss";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    } else if (passwordRef.current.value.length <= 5) {
      return setError("Passwords must be at least 6 characters");
    } else {
      try {
        setError("");
        setLoading(true);
        await signup(emailRef.current.value, passwordRef.current.value);
        history.push("/dashboard");
      } catch {
        setError("Failed to create an account");
      }
      setLoading(false);
    }
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
          <h1 className="text-left mt-3 mb-1">say</h1>
          <img className="ml-3 mb-0" src={logo} />
          <h2 className="text-right mb-1 mt-0">sign up</h2>
          {error && <Alert variant="dark">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="text-left" id="email">
              <Form.Label className="label">email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Form.Group className="text-left" id="password">
              <Form.Label className="label">password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Form.Group className="text-left" id="password-confirm">
              <Form.Label className="label">password confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>

            <Button
              variant="dark"
              disabled={loading}
              className="w-100 button"
              type="submit"
            >
              sign up
            </Button>
          </Form>
        </Card.Body>
      </div>
      <div className="w-100 text-center mt-2 account-text">
        <h4>already have an account ?</h4>
        <Link className="signup-link" to="/login">
          <section class="animation">
            <a>
              <span className="text">log in</span>
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

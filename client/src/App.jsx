import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./Contexts/AuthContext";
import Welcome from "./Components/Welcome/Welcome";
import Signup from "./Components/Signup/Signup";
import DrawCard from "./Components/DrawCard";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <AuthProvider>
            <Route path="/signup">
              <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
              >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <Signup />
                </div>
              </Container>
            </Route>
            <Route path="/haiya" component={DrawCard} />
          </AuthProvider>
        </Switch>
      </Router>
    </>
  );
}

export default App;

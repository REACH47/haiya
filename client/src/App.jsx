import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./Contexts/AuthContext";
import { v4 as uuidV4 } from "uuid";
import Welcome from "./Components/Welcome/Welcome";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import Dashboard from "./Components/Dashboard/Dashboard";
import DrawCard from "./Components/DrawCard";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import "./styles/global.scss";

function App() {
  return (
    <>
      <Router>
        <AnimatePresence>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/welcome" />
            </Route>

            <Route path="/welcome" component={Welcome} />

            {/* <AuthProvider>
              <Route path="/signup">
                <Container
                  className="d-flex align-items-center justify-content-center"
                  style={{ minHeight: "100vh" }}
                >
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Signup />
                  </div>
                </Container>
              </Route> */}

            {/* <PrivateRoute path="/dashboard" component={Dashboard} />

              <PrivateRoute path="/update-profile">
                <Container
                  className="d-flex align-items-center justify-content-center"
                  style={{ minHeight: "100vh" }}
                >
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <UpdateProfile />
                  </div>
                </Container>
              </PrivateRoute> */}

            {/* <Route path="/login">
                <Container
                  className="d-flex align-items-center justify-content-center"
                  style={{ minHeight: "100vh" }}
                >
                  <div className="w-100" style={{ maxWidth: "400px" }}>
                    <Login />
                  </div>
                </Container>
              </Route> */}

            {/* <Route path="/forgot-password">
              <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
              >
                <div className="w-100" style={{ maxWidth: "400px" }}>
                  <ForgotPassword />
                </div>
              </Container>
            </Route>

            <PrivateRoute path="/haiya">
              <Redirect to={`/haiya/${uuidV4()}`} />
            </PrivateRoute>
            <PrivateRoute path="/haiya/:id" component={DrawCard} />
            </AuthProvider> */}
            <Route path="/haiya" exact>
              <Redirect to={`/haiya/${uuidV4()}`} />
            </Route>
            <Route path="/haiya/:id" component={DrawCard} />
          </Switch>
        </AnimatePresence>
      </Router>
    </>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import canvas from "../../Assets/background/canvas-bg.mp4";
import logo from "../../Assets/images/logo.svg";
import "../Welcome/Welcome.scss";

function Welcome() {
  return (
    <div className="haiya">
      <video playsinline autoPlay muted loop>
        <source src={canvas} type="video/mp4" />
      </video>
      <div className="haiya__body">
        <img className="haiya__logo" src={logo} />
        <div className="haiya__select">
          <div className="haiya__left">
            <Link className="haiya__link" to="/signup">
              <section class="animation">
                <a>
                  <span className="text">get started</span>
                  <span className="line -right"></span>
                  <span className="line -top"></span>
                  <span className="line -left"></span>
                  <span className="line -bottom"></span>
                </a>
              </section>
            </Link>
          </div>
          <h4 className="haiya__login">or</h4>
          <h4>
            <div className="haiya__right">
              <Link className="haiya__log-animation" to="/login">
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
          </h4>
        </div>
      </div>
    </div>
  );
}

export default Welcome;

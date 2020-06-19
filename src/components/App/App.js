import React, { useState } from "react";

import "./App.css";
import AddressForm from "../AddressForm";
import CandidateListing from "../CandidateListing";

const pictureOne = require("../../img/cause.jpeg");

function App() {
  const [address, setAddress] = useState("");

  return (
    <div className="main">
      <section className="bg-cover bg-center hero">
        <div className="position-relative z-index-1">
          <div className="container text-center text-black">
            <h1 className="text-uppercase my-4">Civic Coup</h1>
            <p className="font-italic lead">
              Knowledge is power, change starts with you.
            </p>
          </div>
        </div>
        {/* <div className="scroll-btn link-scroll"><i className="fas fa-angle-double-down"></i></div> */}
      </section>
      <section id="1">
        <div className="d-flex h-100 align-items-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <header className="text-center">
                  <h2 className="text-uppercase lined">Cause</h2>
                </header>
                <p className="lead">
                  This can be an about section or anything else ;)
                </p>
                <p>
                  Impossible considered invitation him men instrument saw
                  celebrated unpleasant. Put rest and must set kind next many
                  near nay. He exquisite continued explained middleton am. Voice
                  hours young woody has she think equal. Estate moment he at on
                  wonder at season little. Six garden result summer set family
                  esteem nay estate. End admiration mrs unreserved discovered
                  comparison especially invitation.
                </p>
                <p>
                  Delightful unreserved impossible few estimating men favourable
                  see entreaties. She propriety immediate was improving. He or
                  entrance humoured likewise moderate. Much nor game son say
                  feel. Fat make met can must form into gate. Me we offending
                  prevailed discovery.
                </p>
              </div>
              <div className="col-lg-6">
                <img
                  src={pictureOne}
                  alt="..."
                  className="img-fluid rounded-circle d-block mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray">
        <div className="d-flex h-100 align-items-center">
          <div className="container">
            <header className="App-header">
              <header className="text-center mb-5">
                <h2 className="text-uppercase lined">
                  Find your district candidates
                </h2>
              </header>
              {address ? (
                <CandidateListing address={address} />
              ) : (
                <AddressForm onLocatePlace={(input) => setAddress(input)} />
              )}
            </header>
          </div>
        </div>
      </section>
      <section>
        <div className="d-flex h-100 align-items-center">
          <div className="container">
            <header className="text-center mb-5">
              <h2 className="text-uppercase lined">Contact</h2>
            </header>
            <div className="row">
              <p>
                Effects present letters inquiry no an removed or friends. Desire
                behind latter me though in. Supposing shameless am he engrossed
                up additions. My possible peculiar together to. Desire so better
                am cannot he up before points. Remember mistaken opinions it
                pleasure of debating. Court front maids forty if aware their at.
                Chicken use are pressed removed.
              </p>
              <p>
                Able an hope of body. Any nay shyness article matters own
                removal nothing his forming. Gay own additions education
                satisfied the perpetual. If he cause manor happy. Without
                farther she exposed saw man led. Along on happy could cease
                green oh.
              </p>
              <ul className="mb-0 list-inline text-center">
                <li className="list-inline-item">
                  <a
                    href="https://github.com/civic-coup"
                    className="social-link social-link-twitter"
                  >
                    <i className="fab fa-twitter" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://github.com/civic-coup"
                    className="social-link social-link-instagram"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                </li>
                <li className="list-inline-item">
                  <a
                    href="https://github.com/civic-coup"
                    className="social-link social-link-email"
                  >
                    <i className="fas fa-envelope" />
                  </a>
                </li>
              </ul>
            </div>
            <footer className="py-5 mt-5">
              <div className="row">
                <div className="col-lg-6 text-center text-lg-left">
                  <p className="font-italic mb-0 text-gray">
                    &copy; 2020 Civic Coup
                  </p>
                </div>
                <div className="col-lg-6 text-center text-lg-right">
                  <p className="font-italic mb-0 text-gray">
                    &copy; Template by
                    <a
                      href="https://bootstrapious.com/p/big-bootstrap-tutorial"
                      className="text-gray"
                    >
                      Bootstrapious
                    </a>
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

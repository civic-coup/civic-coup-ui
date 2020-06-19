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
                  What can we do, for long impactful change?
                </p>
                <p>small summary for why?...</p>
                <p>summary on how to go about it with the site...</p>
              </div>
              <div className="col-lg-6">
                <a
                  style={{ display: "table-cell" }}
                  href="https://www.instagram.com/thegeniuslucas/"
                  target="popup"
                >
                  <img
                    src={pictureOne}
                    alt="..."
                    className="img-fluid rounded-circle d-block mx-auto"
                  />
                </a>
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
                Please help us improve, if you see any issues, shoot us an email
                @ some-email@some.com.
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

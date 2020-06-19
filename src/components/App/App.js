import React, { useState } from "react";

import "./App.css";
import AddressForm from "../AddressForm";
import CandidateListing from "../CandidateListing";

const pictureOne = require("../../img/about.jpg");

function App() {
  const [address, setAddress] = useState("");

  return (
    <div className="main">
      <section className="bg-cover bg-center hero">
        <div className="dark-overlay" />
        <div className="position-relative z-index-1">
          <div className="container text-center text-white">
            <p className="font-italic lead">Oh, hello, nice to meet you!</p>
            <h1 className="text-uppercase my-4">My name is screen</h1>
            <p className="font-italic lead">
              I am a nice scrolling template prepared for portfolio, telling
              stories and short presentations.
            </p>
            <p className="font-italic lead">
              I have best results with nice pictures on the background or nice
              colours.
            </p>
          </div>
        </div>
        <div className="scroll-btn link-scroll">
          <i className="fas fa-angle-double-down" />
        </div>
      </section>
      <section id="1">
        <div className="d-flex h-100 align-items-center">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <header className="text-center">
                  <h2 className="text-uppercase lined">About Me</h2>
                </header>
                <p className="lead">
                  DENISE This can be an about section or anything else ;)
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
            <header className="mb-5 text-center">
              <h2 className="text-uppercase lined">
                Find you district candidates!
              </h2>
            </header>
            <div className="App">
              <header className="App-header">
                {address ? (
                  <CandidateListing address={address} />
                ) : (
                  <AddressForm onLocatePlace={(input) => setAddress(input)} />
                )}
              </header>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

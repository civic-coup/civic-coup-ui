import React, { useState } from "react";
import classNames from "classnames";

import "./App.css";
import AddressForm from "../AddressForm";
import CandidateListing from "../CandidateListing";

function App() {
  const [address, setAddress] = useState("");

  return (
    <div className="main">
      <section className={classNames("bg-cover", "bg-center", "hero")}>
        <div className={classNames("main-page", "container")}>
          <div
            className={classNames(
              "text-center",
              "text-white",
              "text-uppercase",
              "my-3",
              "top"
            )}
          >
            <h1>Civic Coup</h1>
            <h8>Choose the right local government</h8>
          </div>
          <div className={classNames("text-center", "text-white")}>
            <p className={classNames("font-italic", "lead", "m3")}>
              Enter your address to see who is running in your district
            </p>
            <div className="App-header">
              {address ? (
                <CandidateListing address={address} />
              ) : (
                <AddressForm onLocatePlace={(input) => setAddress(input)} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

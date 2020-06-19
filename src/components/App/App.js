import React, { useState } from "react";

import "./App.css";
import AddressForm from "../AddressForm";
import CandidateListing from "../CandidateListing";

function App() {
  const [address, setAddress] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        {address ? (
          <CandidateListing address={address} />
        ) : (
          <AddressForm onLocatePlace={(input) => setAddress(input)} />
        )}
      </header>
    </div>
  );
}

export default App;

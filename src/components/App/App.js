import React, { useState } from "react";

import "./App.css";
import AddressForm from "../AddressForm";

function App() {
  const [address, setAddress] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        {address ? (
          <p>{address}</p>
        ) : (
          <AddressForm onSubmit={(input) => setAddress(input)} />
        )}
      </header>
    </div>
  );
}

export default App;

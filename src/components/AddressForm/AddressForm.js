import React, { useState } from "react";
import "./AddressForm.css";

// eslint-disable-next-line react/prop-types
function AddressForm({ onSubmit }) {
  const [input, setInput] = useState("");

  return (
    <form onSubmit={() => onSubmit(input)}>
      <input
        type="text"
        id="address"
        placeholder="Enter your address"
        value={input}
        onInput={(event) => setInput(event.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default AddressForm;

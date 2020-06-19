import React, { useState, useRef } from "react";
import Script from "react-load-script";

import "./AddressForm.css";
import { GOOGLE_PLACES_API_KEY } from "../../constants";

let autoComplete;

// eslint-disable-next-line react/prop-types
function AddressForm({ onLocatePlace }) {
  const [input, setInput] = useState("");
  const autoCompleteRef = useRef(null);

  const onScriptLoad = (handlerFn, ref) => {
    autoComplete = new window.google.maps.places.Autocomplete(ref.current, {
      types: ["geocode"],
      componentRestrictions: { country: "us" },
      fields: ["formatted_address"],
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const circle = new window.google.maps.Circle({
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          radius: position.coords.accuracy,
        });

        autoComplete.setBounds(circle.getBounds());
      });
    }

    autoComplete.addListener("place_changed", () => {
      const addressObject = autoComplete.getPlace();
      const address = addressObject.formatted_address;
      handlerFn(address);
    });
  };

  return (
    <div>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`}
        onLoad={() => onScriptLoad(onLocatePlace, autoCompleteRef)}
      />
      <input
        type="text"
        placeholder="Enter your address"
        ref={autoCompleteRef}
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />
    </div>
  );
}

export default AddressForm;

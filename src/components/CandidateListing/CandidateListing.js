import React, { useState, useEffect } from "react";
import Script from "react-load-script";

import "./CandidateListing.css";
import { CANDIDATE_DATA_URL, GOOGLE_API_KEY } from "../../constants";

const gapiOfficeToSearchOffice = {
  "NY State Senator": "state-senator",
  "NY State Assemblymember": "assembly-member",
  "U.S. Representative": "us-representative",
};

function getDistrictNumber(divisionId) {
  return divisionId.split(":").slice(-1)[0];
}

function getSearchId(office, divisionId) {
  return `${gapiOfficeToSearchOffice[office]}-${getDistrictNumber(divisionId)}`;
}

// eslint-disable-next-line react/prop-types
function CandidateListing({ address }) {
  const [candidateInformation, setCandidateInformation] = useState([]);
  const [stateSenatorCandidates, setStateSenatorCandidates] = useState([]);
  const [usRepCandidates, setUsRepCandidates] = useState([]);
  const [assemblyCandidates, setAssemblyCandidates] = useState([]);
  const [ready, setReady] = useState(false);

  const onScriptLoad = async () => {
    await window.gapi.load("client", async () => {
      await window.gapi.client.setApiKey(GOOGLE_API_KEY);
      await window.gapi.client.load(
        "https://content.googleapis.com/discovery/v1/apis/civicinfo/v2/rest"
      );
      setReady(true);
    });
  };

  useEffect(() => {
    async function fetchCandidateInformation() {
      const resp = await fetch(CANDIDATE_DATA_URL);
      const data = await resp.json();
      setCandidateInformation(data);
    }
    fetchCandidateInformation();
  }, []);

  useEffect(() => {
    async function fetchElectionCandidates() {
      await window.gapi.client.civicinfo.representatives
        .representativeInfoByAddress({ address })
        .then((response) => {
          const { result } = response;
          result.offices.forEach((r) => {
            const { name, divisionId } = r;
            const searchId = getSearchId(name, divisionId);
            const filtered = candidateInformation.filter(
              (d) => d.SearchId === searchId
            );

            if (name === "NY State Senator") {
              setStateSenatorCandidates(filtered);
            } else if (name === "U.S. Representative") {
              setUsRepCandidates(filtered);
            } else if (name === "NY State Assemblymember") {
              setAssemblyCandidates(filtered);
            }
          });
        });
    }

    if (ready) {
      fetchElectionCandidates();
    }
  }, [address, candidateInformation, ready]);

  return (
    <div>
      <Script
        url="https://apis.google.com/js/api.js"
        integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN"
        onLoad={onScriptLoad}
      />
      {address && (
        <div>
          <p>Your Address:</p>
          <p>{address}</p>
        </div>
      )}
      {stateSenatorCandidates.length > 0 && (
        <div>
          <hr />
          <p>State Senators:</p>
          <ul>
            {stateSenatorCandidates.map((val, idx) => {
              return <li key={idx}>{val.name}</li>; // eslint-disable-line react/no-array-index-key
            })}
          </ul>
        </div>
      )}
      {usRepCandidates.length > 0 && (
        <div>
          <hr />
          <p>US Representatives:</p>
          <ul>
            {usRepCandidates.map((val, idx) => {
              return <li key={idx}>{val.name}</li>; // eslint-disable-line react/no-array-index-key
            })}
          </ul>
        </div>
      )}
      {assemblyCandidates.length > 0 && (
        <div>
          <hr />
          <p>State Assembly:</p>
          <ul>
            {assemblyCandidates.map((val, idx) => {
              return <li key={idx}>{val.name}</li>; // eslint-disable-line react/no-array-index-key
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CandidateListing;

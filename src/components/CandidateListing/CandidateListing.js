import React, { useState, useEffect } from "react";
import Script from "react-load-script";

import "./CandidateListing.css";
import { CANDIDATE_DATA_URL, GOOGLE_API_KEY } from "../../constants";

// eslint-disable-next-line react/prop-types
function CandidateListing({ address }) {
  const [electionCandidates, setElectionCandidates] = useState([]);
  const [candidateInformation, setCandidateInformation] = useState([]);
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
      window.gapi.client.civicinfo.representatives
        .representativeInfoByAddress({ address })
        .then((response) => {
          const { result } = response;
          setElectionCandidates(result.officials);
        });
    }

    if (ready) {
      fetchElectionCandidates();
    }
  }, [address, ready]);

  return (
    <div>
      <Script url="https://apis.google.com/js/api.js" onLoad={onScriptLoad} />

      {address && (
        <div>
          <p>Your Address:</p>
          <p>{address}</p>
        </div>
      )}

      {electionCandidates.length && (
        <div>
          <p>Election Candidates:</p>
          <ul>
            {electionCandidates.map((val, idx) => {
              return <li key={idx}>{val.name}</li>; // eslint-disable-line react/no-array-index-key
            })}
          </ul>
        </div>
      )}

      {candidateInformation.length && (
        <div>
          <p>Candidate Information:</p>
          <ul>
            {candidateInformation.map((val, idx) => {
              return <li key={idx}>{val.CandidateName}</li>; // eslint-disable-line react/no-array-index-key
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CandidateListing;

import React, { useState, useEffect } from "react";
import Script from "react-load-script";

import "./CandidateListing.css";
import {
  CANDIDATE_DATA_URL,
  GOOGLE_API_KEY,
  GOOGLE_API_SCRIPT_URL,
  GOOGLE_CIVIC_INFO_URL,
} from "../../constants";

const gapiOfficeToSearchOffice = {
  "NY State Senator": "state-senator",
  "NY State Assemblymember": "assembly-member",
  "U.S. Representative": "us-representative",
};

let csvData

fetch("https://raw.githubusercontent.com/civic-coup/data/master/candidate_data.csv")
  .then(function (response) {
    response.text().then(function (responseText) {
      csvData = window.Papa.parse(responseText, { header: true }).data
    });
  });

function getDistrictNumber(divisionId) {
  return divisionId.split(":").slice(-1)[0];
}

function getSearchId(office, divisionId) {
  return `${gapiOfficeToSearchOffice[office]}-${getDistrictNumber(divisionId)}`;
}

function search(searchId) {
  console.log("Inside search")
  return csvData.filter(data => data.SearchId === searchId)
}

// eslint-disable-next-line react/prop-types
function CandidateListing({ address }) {
  let [candidateInformation, setCandidateInformation] = useState([]);
  let [stateSenatorCandidates, setStateSenatorCandidates] = useState([]);
  let [usRepCandidates, setUsRepCandidates] = useState([]);
  let [assemblyCandidates, setAssemblyCandidates] = useState([]);
  const [ready, setReady] = useState(false);

  const onScriptLoad = async () => {
    await window.gapi.load("client", async () => {
      await window.gapi.client.setApiKey(GOOGLE_API_KEY);
      await window.gapi.client.load(GOOGLE_CIVIC_INFO_URL);
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
    function fetchElectionCandidates() {
      window.gapi.client.civicinfo.representatives
        .representativeInfoByAddress({ address })
        .then((response) => {
          const { result } = response;
          // let stateSenatorCandidates = []
          // let stateAssemblyMemberCandidates = []
          // let usRepresentativeCandidates = []
          result.offices.forEach(function (r) {
            // console.log(r)
            let searchId
            if (r.name == 'NY State Senator') {
              searchId = getSearchId(r.name, r.divisionId)
              console.log("State Senator District: " + searchId)
              stateSenatorCandidates = search(searchId)
            }

            if (r.name == 'U.S. Representative') {
              searchId = getSearchId(r.name, r.divisionId)
              console.log("US Represenative District: " + searchId)
              usRepCandidates = search(searchId)
            }

            if (r.name == 'NY State Assemblymember') {
              searchId = getSearchId(r.name, r.divisionId)
              console.log("NY State Assemblymember: " + searchId)
              assemblyCandidates = search(searchId)
            }

          })

          console.log("State Senator Candidates: ")
          console.log(stateSenatorCandidates)
          console.log("U.S. Representative Candidates: ")
          console.log(usRepCandidates)
          console.log("State Assembly Member Candidates: ")
          console.log(assemblyCandidates)
        });
    }

    if (ready) {
      fetchElectionCandidates();
    }
  }, [address, candidateInformation, ready]);

  return (
    <div>
      <Script url={GOOGLE_API_SCRIPT_URL} onLoad={onScriptLoad} />
      {address && (
        <div>
          <p>{address}</p>
        </div>
      )}
      {usRepCandidates && usRepCandidates.length > 0 && (
        <div>
          <hr />
          <p>US Representatives:</p>
          <ul>
            {usRepCandidates.map((val, idx) => {
              const { CandidateName, Party, Issues } = val;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={idx}>{`${CandidateName} (${Party}) - ${Issues}`}</li>
              );
            })}
          </ul>
        </div>
      )}
      {stateSenatorCandidates && stateSenatorCandidates.length > 0 && (
        <div>
          <hr />
          <p>State Senators:</p>
          <ul>
            {stateSenatorCandidates.map((val, idx) => {
              const { CandidateName, Party, Issues } = val;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={idx}>{`${CandidateName} (${Party}) - ${Issues}`}</li>
              );
            })}
          </ul>
        </div>
      )}
      {assemblyCandidates && assemblyCandidates.length > 0 && (
        <div>
          <hr />
          <p>State Assembly:</p>
          <ul>
            {assemblyCandidates.map((val, idx) => {
              const { CandidateName, Party, Issues } = val;
              return (
                // eslint-disable-next-line react/no-array-index-key
                <li key={idx}>{`${CandidateName} (${Party}) - ${Issues}`}</li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CandidateListing;

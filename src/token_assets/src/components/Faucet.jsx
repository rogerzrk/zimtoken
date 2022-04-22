import React from "react";
import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Faucet() {

  const [message, setMessage] = useState("Gimme Gimme");
  const [isDisabled, setDisabled] = useState(false);

  async function handleClick(event) {
    setDisabled(true);
    const msg = await token.payOut();
    setMessage(msg);
  };

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free ZIM tokens here! Claim 10,000 ZIM tokens to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled = {isDisabled}>
          {message}
        </button>
      </p>
    </div>
  );
}

export default Faucet;

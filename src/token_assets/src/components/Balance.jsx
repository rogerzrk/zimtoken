import React, { useState } from "react";
import {Principal} from "@dfinity/principal";
import {token} from "../../../declarations/token";

function Balance() {

  const [inputValue, setInput] = useState("");
  const [balanceResult, setBalance] = useState("");
  const [symbol, setSymbol] = useState("");
  
  async function handleClick() {
    // console.log("Balance Button Clicked");
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    setBalance(balance.toLocaleString());
    setSymbol(await token.getSymbol());
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p>This account has a balance of {balanceResult} {symbol}.</p>
    </div>
  );
}

export default Balance;

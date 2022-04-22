import React from "react";
import React, { useState } from "react";
import { token } from "../../../declarations/token";
import {Principal} from "@dfinity/principal";

function Transfer() {
  const [receipientId, setReceipientId] = useState("");
  const [amount, setAmount] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [msg, setMsg] = useState("");
  const [isHidden, setHidden] = useState(true);
  
  async function handleClick() {
    setDisabled(true);
    const receiver = Principal.fromText(receipientId);
    const amountToTransfer = Number(amount);
    setMsg(await token.transfer(receiver, amountToTransfer));
    setHidden(false);
    setDisabled(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={receipientId}
                onChange={(e) => setReceipientId(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            Transfer
          </button>
        </p>
        <p hidden = {isHidden}>{msg}</p>
      </div>
    </div>
  );
}

export default Transfer;

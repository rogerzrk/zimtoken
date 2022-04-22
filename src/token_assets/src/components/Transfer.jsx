import React from "react";
import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Transfer() {
  
  async function handleClick() {
    
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
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} >
            Transfer
          </button>
        </p>
      </div>
    </div>
  );
}

export default Transfer;

import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
  // Create the principal owner, total supply and token symbol
  let owner: Principal = Principal.fromText("flpv7-q7kcv-3pt33-toog5-h2c7u-sf3l6-nyxnk-6aa54-ax3zc-azvyp-bqe");
  let totalSupply: Nat = 999999999;
  let symbol: Text = "ZIM";

  // Create ledger; a stable list and a hashmap
  private stable var balanceEntries: [(Principal, Nat)] = [];
  private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  // To query balances
  public query func balanceOf(who: Principal): async Nat{
    let balance: Nat = switch(balances.get(who)){
      case null 0;
      case(?result) result;
    };
    return balance;
  };

  // Send symbol to front-end
  public query func getSymbol(): async Text {
    return symbol;
  };

  // Faucet functionality
  public shared(msg) func payOut(): async Text {
    Debug.print(debug_show(msg.caller));
    let amount = 10000;
    if (balances.get(msg.caller) == null){
      // Transfer from Cannister token
      let result = await transfer(msg.caller, amount);
      return result;
    } else {
        return "Already Claimed Tokens";
    };
  };

// Transfer functionality
  public shared(msg) func transfer(to: Principal, amount: Nat): async Text {
    let fromBalance = await balanceOf(msg.caller);
    if (fromBalance > amount) {
      let newFromBalance: Nat = fromBalance - amount;
      balances.put(msg.caller, newFromBalance);
      
      let toBalance = await balanceOf(to);
      let newToBalance = toBalance + amount;
      balances.put(to, newToBalance);

      return "Success";
    } else {
      return "Insufficient Funds";
    };
  };

  system func preupgrade(){
    balanceEntries := Iter.toArray(balances.entries()); 
  };

  system func postupgrade(){
      balances:= HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);

        // Deposit total supply in owner's wallet
      if(balances.size() < 1){
        balances.put(owner, totalSupply);
      }; 
  };

};
// Global variables
let price = 19.5; // Example price
let cid = [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]; // Example cid
let cash = 20; // Example cash

// Helper function to get the total amount of cash in the drawer
function getCidTotal(cid) {
  return cid.reduce((acc, curr) => acc + curr[1], 0);
}

// Helper function to format the change due
function formatChange(changeDue, cid) {
  const currencyUnit = [
    ["ONE HUNDRED", 100],
    ["TWENTY", 20],
    ["TEN", 10],
    ["FIVE", 5],
    ["ONE", 1],
    ["QUARTER", 0.25],
    ["DIME", 0.1],
    ["NICKEL", 0.05],
    ["PENNY", 0.01]
  ];

  let result = [];
  for (let [unit, value] of currencyUnit) {
    let coinCount = 0;
    while (changeDue >= value && cid.some(item => item[0] === unit && item[1] > 0)) {
      changeDue = (changeDue - value).toFixed(2);
      coinCount++;
      let index = cid.findIndex(item => item[0] === unit);
      cid[index][1] -= value;
    }
    if (coinCount > 0) {
      result.push([unit, (value * coinCount).toFixed(2)]);
    }
  }
  return result;
}

// Main function to handle the cash register logic
function checkCashRegister() {
  let changeDue = cash - price;

  if (changeDue < 0) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  let cidTotal = getCidTotal(cid);

  if (changeDue === 0) {
    document.getElementById("change-due").innerText = "No change due - customer paid with exact cash";
    return;
  }

  if (cidTotal < changeDue) {
    document.getElementById("change-due").innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let change = formatChange(changeDue, [...cid]);

  // Check if the change can be returned with the available denominations
  let totalChangeReturned = change.reduce((acc, [unit, amount]) => acc + parseFloat(amount), 0);

  if (totalChangeReturned < changeDue) {
    document.getElementById("change-due").innerText = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  // Check if the total cash in drawer is equal to the change due
  if (cidTotal === changeDue) {
    document.getElementById("change-due").innerText = "Status: CLOSED " + change.map(([unit, amount]) => `${unit}: $${amount}`).join(" ");
    return;
  }

  document.getElementById("change-due").innerText = "Status: OPEN " + change.map(([unit, amount]) => `${unit}: $${amount}`).join(" ");
}

// Event listener for the purchase button
document.getElementById("purchase-btn").addEventListener("click", () => {
  cash = parseFloat(document.getElementById("cash").value);
  checkCashRegister();
});

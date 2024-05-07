let apiKey = "df81760726d52f528662944a";
let api = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result");
  
function initializeDropdowns() {
  currencies.forEach((currency, index) => {
    const fromOption = document.createElement("option");
    const toOption = document.createElement("option");
    fromOption.value = currency;
    fromOption.text = currency;
    toOption.value = currency;
    toOption.text = currency;
  
    fromDropDown.add(fromOption);
    toDropDown.add(toOption);
  
    if (index === 0) {
fromOption.selected = true;
    } else if (index === 1) {
toOption.selected = true;
    }
  });
}
  
function setDefaultValues() {
  fromDropDown.value = "INR";
  toDropDown.value = "USD";
}
result.style.display = "none";
function convertCurrency() {
  const amount = parseFloat(document.querySelector("#amount").value);
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;
  
  if (!isNaN(amount) && amount > 0) {
    fetch(api)
.then((resp) => resp.json())
.then((data) => {
  if (
    data.result === "success" &&
    data.conversion_rates[fromCurrency] !== undefined &&
    data.conversion_rates[toCurrency] !== undefined
  ) {
    let fromExchangeRate = data.conversion_rates[fromCurrency];
    let toExchangeRate = data.conversion_rates[toCurrency];
    const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;
    result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    result.style.display = "block"; // Display result
  } else {
    result.style.display = "none"; // Hide result when conversion rates are unavailable
  }
})
.catch((error) => {
  console.error("Error fetching data:", error);
  result.style.display = "none"; // Hide result on error
});
  } else {
    result.style.display = "none"; // Hide result when invalid amount
    alert("Please enter a valid amount");
  }
}
  
function swapCurrencies() {
  const temp = fromDropDown.value;
  fromDropDown.value = toDropDown.value;
  toDropDown.value = temp;
}
  
initializeDropdowns();
setDefaultValues();
  
document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);
  
document
  .querySelector("#swap-button")
  .addEventListener("click", swapCurrencies);
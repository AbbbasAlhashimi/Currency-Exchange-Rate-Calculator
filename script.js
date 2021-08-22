//Initialize inputs passed on to the DOM
const currencyEl_one = document.getElementById('currency-one'); //INPUT Currency Option
const amountEl_one = document.getElementById('amount-one'); // INPUT Currency Number
const currencyEl_two = document.getElementById('currency-two');//OUTPUT Currency Option
const amountEl_two = document.getElementById('amount-two');// OUTPUT Currency Number

const rateEl = document.getElementById('rate'); // Rate Output Label.
const swap = document.getElementById('swap'); // SWAP Button Trigger

// Fetch exchange rates and update the DOM
function caclulate()
{
    //Passinput Values from the DOM into the Function
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`; // [1] [USD] = [8.52] [TRY]

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2); // toFixed(2) for Decimal Values
    });
}

// Event listeners
currencyEl_one.addEventListener('change', caclulate); // Changing the state of the currency [USD,EUR,TRY,etc].
amountEl_one.addEventListener('input', caclulate);
currencyEl_two.addEventListener('change', caclulate); // Changing the state of the currency [USD,EUR,TRY,etc].
amountEl_two.addEventListener('input', caclulate);

swap.addEventListener('click', () =>
{
    //Initialize a Temprory variable to hold the INPUT Currency Value
  const temp = currencyEl_one.value;
  //Switch Values when the [Swap Currency] Button is Clicked
  currencyEl_one.value = currencyEl_two.value;
  //Set the Pre-Inputed value as the initial value for the temp variable
  //this event switch output currency into an input one
  currencyEl_two.value = temp;
  caclulate();
});

caclulate();

// const convert = document.getElementById("convert");
// const result = document.getElementById("result");
// const from = document.getElementById("from");
// const to = document.getElementById("to");
// const amount = document.getElementById("amount");
// document.addEventListener('DOMContentLoaded', function() {
//    // let from = document.querySelector('#from');
//    // let to = document.querySelector('#to');
//    let fromCurrency = from.value;
//    let toCurrency = to.value;
//    let amt = amount.value;
//    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
//    .then(response => {
//          return response.json();
//    })
//    .then(data => {
//       let rate = data.rates[toCurrency];
//       let total = rate * amt;
//       result.innerHTML = `${amt} ${fromCurrency} = ${total} ${toCurrency}`;
//    });
// });
const convert = document.getElementById("convert");
const result = document.getElementById("result");
const from = document.getElementById("from");
const to = document.getElementById("to");
const amount = document.getElementById("amount");

convert.addEventListener("click", function() {
   let fromCurrency = from.value;
   let toCurrency = to.value;
   let amt = parseFloat(amount.value);
   
   fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
   .then(response => response.json())
   .then(data => {
      let rate = data.rates[toCurrency];
      let total = rate * amt;
      result.innerHTML = `${amt} ${fromCurrency} = ${total.toFixed(2)} ${toCurrency}`;
      
   })
   .catch(error => console.log(error));
});




// function convertCurrency() {

//     let fromCurrency = from.value;
//     let toCurrency = to.value;
//     let amt = amount.value;
//     fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
//     .then(response => {
//           return response.json();
//     })
//     .then(data => {
//        let rate = data.rates[toCurrency];
//        let total = rate * amt;
//        result.innerHTML = `${amt} ${fromCurrency} = ${total}
//        ${toCurrency}`;
//     });
//  }
 
//  convert.addEventListener("click", convertCurrency);
 

// function convertCurrency() {

//    let fromCurrency = from.value;
//    let toCurrency = to.value;
//    let amt = amount.value;
//    fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
//    .then(response => {
//          return response.json();
//    })
//    .then(data => {
//       console.log(data); // Check the value of data
//       let rate = data.rates[toCurrency];
//       console.log(rate); // Check the value of rate
//       let total = rate * amt;
//       result.innerHTML = `${amt} ${fromCurrency} = ${total} ${toCurrency}`;
//    })
//    .catch(error => {
//       console.log(error); // Log any errors to the console
//    });
//  }
 
//  document.addEventListener("DOMContentLoaded", function() {
//    const convert = document.getElementById("convert");
//    convert.addEventListener("click", convertCurrency);
//  });
 
const CalculateButton = document.getElementById("calculateButton");
let fibonacciResult = document.getElementById("fibonacciResult");
let fibonacciInput = document.getElementById("fibonacciInput").value;
CalculateButton.addEventListener("click", resultFunc);

function resultFunc() {
  fibonacciInput = document.getElementById("fibonacciInput").value;
  if (fibonacciInput > 50) {
    fibonacciResult.innerText = "Can't be larger then 50";
  } else {
    getFromServer(fibonacciInput);
  }
}

function getFromServer(number) {
  const ficonacciServer = `http://localhost:5050/fibonacci/${number}`;
  fetch(ficonacciServer)
    .then(function (response) {
      if (response.status === 400) {
        throw new Error(`42 is the meaning of life!`);
      }
      return response.json();
    })
    .then(function (data) {
      fibonacciResult.innerText = data.result;
    })
    .catch((error) => {
      fibonacciResult.innerText = error;
    });
}

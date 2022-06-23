const CalculateButton = document.getElementById("calculateButton");
let fibonacciResult = document.getElementById("fibonacciResult");
let fibonacciInput = document.getElementById("fibonacciInput").value;
CalculateButton.addEventListener("click", resultFunc);

function resultFunc() {
  fibonacciInput = document.getElementById("fibonacciInput").value;
  getFromServer(fibonacciInput);
}

function getFromServer(number) {
  const ficonacciServer = `http://localhost:5050/fibonacci/${number}`;
  fetch(ficonacciServer)
    .then(function (response) {
      return response.json();
    })

    .then(function (data) {
      fibonacciResult.innerText = data.result;
    });
}

const calculateButton = document.getElementById("calculateButton");
let fibonacciResult = document.getElementById("fibonacciResult");
let spinnerDiv = document.getElementById("spinner-id");
let fibonacciInputBox = document.getElementById("fibonacciInput");
let errorText = document.getElementById("error-text");

calculateButton.addEventListener("click", resultFunc);

function resultFunc() {
  let fibonacciInput = document.getElementById("fibonacciInput").value;
  spinnerDiv.classList.remove("visually-hidden");
  fibonacciResult.classList.add("visually-hidden");
  fibonacciInputBox.classList.remove("border-danger", "text-danger");

  if (fibonacciInput > 50) {
    fibonacciInputBox.classList.add("border-danger", "text-danger");
    spinnerDiv.classList.add("visually-hidden");
    errorText.innerText = "Can't be larger then 50!";
    errorText.classList.remove("visually-hidden");
  } else {
    getFromServer(fibonacciInput);
  }
}

function getFromServer(number) {
  const ficonacciServer = `http://localhost:5050/fibonacci/${number}`;
  fetch(ficonacciServer)
    .then((response) => {
      if (response.status === 400) {
        throw new Error(`42 is the meaning of life!`);
      }
      return response.json();
    })
    .then((data) => {
      errorText.classList.add("visually-hidden");
      fibonacciResult.classList.remove("visually-hidden", "text-danger");
      fibonacciResult.innerHTML = `<u><b>${data.result}</b></u>`;
      spinnerDiv.classList.add("visually-hidden");
    })
    .catch((error) => {
      errorText.classList.add("visually-hidden");
      fibonacciResult.classList.remove("visually-hidden");
      fibonacciResult.classList.add("text-danger");
      fibonacciInputBox.classList.add("border-danger", "text-danger");
      spinnerDiv.classList.add("visually-hidden");
      fibonacciResult.innerHTML = error;
    });
}

// console.log(
//   `The Fibonacci of ${data.results[0].number} is ${
//     data.results[0].result
//   } Calculated at ${new Date(data.results[0].createdDate)} `
// );

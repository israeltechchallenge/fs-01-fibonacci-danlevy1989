window.addEventListener("load", () => {
  getAllResults().then((result) => showResults(result));
});
let fibonacciResult = document.getElementById("fibonacciResult");
const calculateButton = document.getElementById("calculateButton");
let listOfResults = document.getElementById("listOfResults");
let spinnerDiv = document.getElementById("spinner-id");
let fibonacciInputBox = document.getElementById("fibonacciInput");
let errorText = document.getElementById("error-text");
let checkBox = document.getElementById("checkBox");

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
  } else if (fibonacciInput < 0) {
    fibonacciInputBox.classList.add("border-danger", "text-danger");
    spinnerDiv.classList.add("visually-hidden");
    errorText.innerText = "Can't be less then 0!";
    errorText.classList.remove("visually-hidden");
  } else {
    if (checkBox.checked) {
      getFromServer(fibonacciInput).then(() => {
        getAllResults().then((result) => addResultOne(result));
      });
    } else {
      fibbo(fibonacciInput);
      spinnerDiv.classList.add("visually-hidden");
      fibonacciResult.classList.remove("visually-hidden");
    }
  }
}

function getFromServer(number) {
  const ficonacciServer = `http://localhost:5050/fibonacci/${number}`;
  return fetch(ficonacciServer)
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

function getAllResults() {
  const ficonacciServer = "http://localhost:5050/getFibonacciResults";
  return fetch(ficonacciServer)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let sortedDatesArray = data.results.sort(function (a, b) {
        return new Date(b.createdDate) - new Date(a.createdDate);
      });
      return sortedDatesArray;
    });
}

function showResults(sortedDatesArray) {
  spinnerDiv.classList.add("visually-hidden");
  for (let i = 0; i < 10; i++) {
    listOfResults.innerHTML += `<p class="fs-5 border-bottom pb-3 border-secondary">The Fibonacci of <b>${
      sortedDatesArray[i].number
    }</b> is <b>${sortedDatesArray[i].result}</b> Calculated at: ${new Date(
      sortedDatesArray[i].createdDate
    )}</p>`;
  }
}

function addResultOne(sortedArray) {
  listOfResults.innerHTML = `<p class="fs-5 border-bottom pb-3 border-secondary">The Fibonacci of <b>${
    sortedArray[0].number
  }</b> is <b>${sortedArray[0].result}</b> Calculated at: ${new Date(
    sortedArray[0].createdDate
  )}</p>${listOfResults.innerHTML}`;
}

function fibbo() {
  errorText.classList.add("visually-hidden");
  fibonacciInput = document.getElementById("fibonacciInput").value;
  let fiboArray = [];
  let fiboY;

  if (fibonacciInput == 0 || fibonacciInput == 1) {
    fiboY = fibonacciInput;
  } else if (fibonacciInput > 1) {
    fiboArray = [0, 1];
    for (let i = 2; i < fibonacciInput; i++) {
      fiboArray[i] =
        fiboArray[fiboArray.length - 2] + fiboArray[fiboArray.length - 1];
    }

    fiboY = fiboArray[fiboArray.length - 2] + fiboArray[fiboArray.length - 1];
  }

  fibonacciResult.innerHTML = fiboY;
}

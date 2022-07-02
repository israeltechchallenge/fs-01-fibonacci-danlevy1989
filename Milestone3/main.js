const calculateButton = document.getElementById("calculateButton");
calculateButton.addEventListener("click", fibbo);

function fibbo() {
  let fibonacciInput = document.getElementById("fibonacciInput").value;

  let fiboArray = [];
  let fiboY;

  if (fibonacciInput == 0) {
    fiboY = 0;
  }
  if (fibonacciInput == 1) {
    fiboY = 1;
  } else if (fibonacciInput > 1) {
    fiboArray = [0, 1];
    for (let i = 2; i < fibonacciInput; i++) {
      fiboArray[i] =
        fiboArray[fiboArray.length - 2] + fiboArray[fiboArray.length - 1];
    }

    fiboY = fiboArray[fiboArray.length - 2] + fiboArray[fiboArray.length - 1];
  }

  document.getElementById("fibonacciResult").innerText = fiboY;
}

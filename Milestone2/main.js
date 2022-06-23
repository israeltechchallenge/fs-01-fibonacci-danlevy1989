function fibbo(fibonacciInput) {
  let fiboY;
  let fiboArray = [];

  if (fibonacciInput == 0) {
    return 0;
  }
  if (fibonacciInput == 1) {
    return 1;
  } else if (fibonacciInput > 1) {
    fiboArray = [0, 1];
    for (let i = 2; i < fibonacciInput; i++) {
      fiboArray[i] =
        fiboArray[fiboArray.length - 2] + fiboArray[fiboArray.length - 1];
    }
    fiboY = fiboArray[fiboArray.length - 2] + fiboArray[fiboArray.length - 1];
  }
  return fiboY;
}

document.getElementById("fiboYaxis").innerText = fibbo(6);

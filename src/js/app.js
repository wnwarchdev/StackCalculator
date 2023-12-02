`use strict`;

const inputSqM = document.getElementById("inputSqM");
const inputSqFt = document.getElementById("inputSqFt");
const calculator = document.getElementById("calculator");

const calcArea = function (unit, area) {
  const result = unit == "inputSqM" ? area * 10.7639 : area / 10.7639;
  return Number.parseFloat(result).toFixed(2);
};

calculator.addEventListener("keyup", function (e) {
  e.preventDefault;
  if (e.target.tagName == "INPUT") {
    console.log(e.target);
    e.target.id == `inputSqM`
      ? (inputSqFt.value = calcArea(e.target.id, inputSqM.value))
      : (inputSqM.value = calcArea(e.target.id, inputSqFt.value));
  } else {
    console.log("not input");
  }
});

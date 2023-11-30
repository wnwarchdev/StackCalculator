`use strict`;

const inputSqM = document.getElementById("inputSqM");
const inputSqFt = document.getElementById("inputSqFt");

const calcArea = function (unit, area) {
  const result = unit == "inputSqM" ? area * 10.7639 : area / 10.7639;
  console.log(typeof result);
  return Number.parseFloat(result).toFixed(2);
  //return result.toFixed(2);
};

inputSqM.addEventListener("keyup", function (e) {
  e.preventDefault;
  console.log(e.target);
  console.log("m2");
  inputSqFt.value = calcArea(e.target.id, inputSqM.value);
});

// inputSqFt.addEventListener("keyup", function (e) {
//   console.log("sqft");
//   inputSqM.value = calcArea(false, inputSqFt.value);
// });

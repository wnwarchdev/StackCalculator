`use strict`;

// const inputSqM = document.getElementById("inputSqM");
// const inputSqFt = document.getElementById("inputSqFt");
const calculator = document.getElementById("calculator");

const calcArea = function (unit, area) {
  const result = unit == "inputSqM" ? area * 10.7639 : area / 10.7639;
  return Number.parseFloat(result).toFixed(2);
};

const levelDiv = `<div class="level">
<p>
  m2
  <input
    id="inputSqM"
    min="0"
    type="number"
    pattern="^\d*(\.\d{0,2})?$"
    onpaste="return false;"
    ondrop="return false;"
    autocomplete="off"
  />
</p>
<p>
  sqft
  <input
    id="inputSqFt"
    min="0"
    type="number"
    pattern="^\d*(\.\d{0,2})?$"
    onpaste="return false;"
    ondrop="return false;"
    autocomplete="off"
  />
</p>
`;

const addLevel = function () {
  calculator.insertAdjacentHTML("afterbegin", levelDiv);
  const inputSqM = document.getElementById("inputSqM");
  const inputSqFt = document.getElementById("inputSqFt");
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
};

addLevel();
addLevel();
addLevel();
addLevel();
addLevel();
addLevel();

// calculator.addEventListener("keyup", function (e) {
//   e.preventDefault;
//   if (e.target.tagName == "INPUT") {
//     console.log(e.target);
//     e.target.id == `inputSqM`
//       ? (inputSqFt.value = calcArea(e.target.id, inputSqM.value))
//       : (inputSqM.value = calcArea(e.target.id, inputSqFt.value));
//   } else {
//     console.log("not input");
//   }
// });

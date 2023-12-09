`use strict`;

// const inputSqM = document.getElementById("inputSqM");
// const inputSqFt = document.getElementById("inputSqFt");
const calculator = document.getElementById("calculator");
const addBtn = document.getElementById("add");

const stack = [];
const level = { levelId: 0, number: 0, areaSqM: 0, areaSqFt: 0 };

/// area converter

const calcArea = function (unit, area) {
  const result = unit == "inputSqM" ? area * 10.7639 : area / 10.7639;
  return Number.parseFloat(result).toFixed(2);
};

// const addStack = function () {
//   addLevel();
// };

const levelDiv = `<div class="level">
<p>
  level
  <input
    id="level"
    type="text"
    pattern="[0-9]*"
    inputmode="numeric"
    onpaste="return false;"
    ondrop="return false;"
    maxlength="3"
    // oninput = "(this.value.length > this.maxLength) ? this.value = this.value.slice(0, this.maxLength) : this.value;"
    autocomplete="off"
  />
</p>
<p>
  m2
  <input
    id="inputSqM"
    min="0"
    value="0.00"
    type="number"
    pattern="^\d*(\.\d{0,2})?$"
    onpaste="return false;"
    ondrop="return false;"
    onblur="this.value = parseFloat(this.value).toFixed(2)"
    autocomplete="off"
  />
</p>
<p>
  sqft
  <input
    id="inputSqFt"
    min="0"
    value="0.00"
    type="number"
    pattern="^\d*(\.\d{0,2})?$"
    onpaste="return false;"
    ondrop="return false;"
    onblur="this.value = parseFloat(this.value).toFixed(2)"
    autocomplete="off"
  />
</p>
<p>
  <button>🗑️</button>
</p>
`;

const addLevel = function () {
  calculator.insertAdjacentHTML("afterbegin", levelDiv);
  const inputSqM = document.getElementById("inputSqM");
  const inputSqFt = document.getElementById("inputSqFt");
  calculator.addEventListener("keyup", function (e) {
    e.preventDefault;
    if (e.target.tagName == "INPUT") {
      //console.log(e.target);
      e.target.id == `inputSqM`
        ? (inputSqFt.value = calcArea(e.target.id, inputSqM.value))
        : (inputSqM.value = calcArea(e.target.id, inputSqFt.value));
    } else {
      console.log("not input");
    }
  });
};

addLevel();

addBtn.addEventListener("click", function () {
  console.log("clicked");
  addLevel();
});

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

////object

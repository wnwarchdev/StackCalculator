`use strict`;

// const inputSqM = document.getElementById("inputSqM");
// const inputSqFt = document.getElementById("inputSqFt");
const calculator = document.getElementById("calculator");
const addBtn = document.getElementById("add");
let id = 1;

const stack = [];

/// area converter
const calcArea = function (unit, area) {
  const result = unit == "inputSqM" ? area * 10.7639 : area / 10.7639;
  return Number.parseFloat(result).toFixed(2);
};

const renderStack = function () {
  console.log(stack);
  stack.forEach((level) => {
    console.log(level);
  });
};
//level div
// const addLevel = function () {

// };

const addLevel = function () {
  // let level;
  // level = { levelId: id, number: 1, areaSqM: 0, areaSqFt: 0 };
  // stack.push(level);

  const levelDiv = `<div class="level" id="levelDiv-${id}">
<p>
  level
  <input
    id="level-${id}"
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
    id="inputSqM-${id}"
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
    id="inputSqFt-${id}"
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
  <button
  id="levelDivRemove-${id}">🗑️</button>
</p>
`;

  calculator.insertAdjacentHTML("afterbegin", levelDiv);
  let inputSqM = document.getElementById(`inputSqM-${id}`);
  let inputSqFt = document.getElementById(`inputSqFt-${id}`);

  //console.log(inputSqFt, inputSqM);

  inputSqM.addEventListener("keyup", function (e) {
    e.preventDefault;
    console.log(inputSqM);
    inputSqFt.value = calcArea(`inputSqM`, inputSqM.value);
  });

  inputSqFt.addEventListener("keyup", function (e) {
    e.preventDefault;
    console.log(inputSqFt);
    inputSqM.value = calcArea(`inputSqFt`, inputSqFt.value);
  });

  id++;
};

///functionality for levelDiv remove buttons

const levelDivRemove = function (id) {
  const removedLevel = document.getElementById(`levelDiv-${id}`);
  removedLevel.remove();
};

function listenerFunction(e) {
  e.preventDefault;
  console.log(e.target.tagName);
  if (e.target.tagName == "BUTTON") {
    console.log("listener!!!");
    levelDivRemove(e.target.id.slice(15));
  }
}

///functionality for levelDiv add button

addBtn.addEventListener("click", function () {
  addLevel();
  calculator.removeEventListener("click", listenerFunction, true);
  calculator.addEventListener("click", listenerFunction, true);
});

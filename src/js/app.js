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
  let level;
  level = { levelId: id, number: 1, areaSqM: 0, areaSqFt: 0 };
  stack.push(level);

  const levelDiv = `<div class="level">
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
  <button>🗑️</button>
</p>
`;

  calculator.insertAdjacentHTML("afterbegin", levelDiv);
  const inputSqM = document.getElementById(`inputSqM-${id}`);
  const inputSqFt = document.getElementById(`inputSqFt-${id}`);
  calculator.addEventListener("keyup", function (e) {
    e.preventDefault;
    if (e.target.tagName == "INPUT") {
      console.log(e.target);
      e.target.id == `inputSqM-${id}`
        ? (inputSqFt.value = calcArea(e.target.id, inputSqM.value))
        : (inputSqM.value = calcArea(e.target.id, inputSqFt.value));
    } else {
      console.log("not input");
    }
  });

  id++;
};

addBtn.addEventListener("click", function () {
  addLevel();
  renderStack();
});

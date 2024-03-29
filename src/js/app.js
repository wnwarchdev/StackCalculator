`use strict`;

const calculator = document.getElementById("calculator");
const stackDiv = document.getElementById("stack");
const addAboveBtn = document.getElementById("addAbove");
const addBelowBtn = document.getElementById("addBelow");
const btnReset = document.getElementById("btnReset");

const totalLevel = document.getElementById("totalLevel");
const totalSqM = document.getElementById("totalSqM");
const totalSqFt = document.getElementById("totalSqFt");

let id = 1;

const stack = [];

/// area converter
const calcArea = function (unit, area) {
  const result = unit == "inputSqM" ? area * 10.7639 : area / 10.7639;
  return Number.parseFloat(result).toFixed(2);
};

const updateTotalLevel = function () {
  totalLevel.innerText = String(stack.length).padStart(3, "0").slice(-3);
};

const updateTotalSqM = function () {
  let total = 0;
  for (const i in stack) {
    total = total + parseFloat(stack[i].areaSqM);
  }

  totalSqM.innerText = total.toFixed(2) + " m²";
};

const updateTotalSqFt = function () {
  let total = 0;
  for (const i in stack) {
    total = total + parseFloat(stack[i].areaSqFt);
  }

  totalSqFt.innerText = total.toFixed(2) + " ft²";
};

const renderStack = function () {
  updateTotalLevel();
  updateTotalSqM();
  updateTotalSqFt();
};

const addLevel = function (position) {
  let level;
  level = { levelId: id, number: 1, areaSqM: 0, areaSqFt: 0 };
  stack.push(level);
  const currentId = id;

  const levelDiv = `<div class="level prevent-select" id="levelDiv-${id}">
<p>
  <span class="excessText">level</span>
  <input
    id="level-${currentId}"
    class="input inputLevel"
    type="text"
    pattern="[0-9]*"
    inputmode="decimal"
    onpaste="return false;"
    ondrop="return false;"
    maxlength="3"
    // oninput = "(this.value.length > this.maxLength) ? this.value = this.value.slice(0, this.maxLength) : this.value;"
    autocomplete="off"
  />
</p>
<p>
  
  <input
    id="inputSqM-${currentId}"
    class="input"
    inputmode="decimal"
    maxlength="7"
    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    min="0"
    value="0.00"
    type="text"
    pattern="^\d*(\.\d{0,2})?$"
    onpaste="return false;"
    ondrop="return false;"
    onblur="this.value = parseFloat(this.value).toFixed(2)"
    autocomplete="off"
  /> m²
</p>
<p>
  
  <input
    id="inputSqFt-${currentId}"
    class="input"
    inputmode="decimal"
    min="0"
    value="0.00"
    maxlength="8"
    oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    type="text"
    pattern="^\d*(\.\d{0,2})?$"
    onpaste="return false;"
    ondrop="return false;"
    onblur="this.value = parseFloat(this.value).toFixed(2)"
    autocomplete="off"
  /> ft²
</p>
<p>
  <button class ="bin"
  id="levelDivRemove-${currentId}">X</button>
</p>
`;

  stackDiv.insertAdjacentHTML(
    position == `above` ? "afterbegin" : "beforeend",
    levelDiv,
  );
  let inputSqM = document.getElementById(`inputSqM-${currentId}`);
  let inputSqFt = document.getElementById(`inputSqFt-${currentId}`);
  let inputNumber = document.getElementById(`level-${currentId}`);

  //add level listener

  inputNumber.addEventListener("keyup", function (e) {
    e.preventDefault;
    for (const i in stack) {
      if (stack[i].levelId == currentId) {
        stack[i].number = inputNumber.value;
      }
    }
    renderStack();
  });

  inputSqM.addEventListener("keyup", function (e) {
    e.preventDefault;
    let conversion = calcArea(`inputSqM`, inputSqM.value);
    inputSqFt.value = conversion;

    for (const i in stack) {
      if (stack[i].levelId == currentId) {
        stack[i].areaSqM = inputSqM.value;
        stack[i].areaSqFt = conversion;
      }
    }
    renderStack();
  });

  inputSqFt.addEventListener("keyup", function (e) {
    e.preventDefault;
    let conversion = calcArea(`inputSqFt`, inputSqFt.value);
    inputSqM.value = conversion;

    for (const i in stack) {
      if (stack[i].levelId == currentId) {
        stack[i].areaSqM = conversion;
        stack[i].areaSqFt = inputSqFt.value;
      }
    }
    renderStack();
  });
  renderStack();
  id++;
};

///functionality for levelDiv remove buttons

const levelDivRemove = function (id) {
  const removedLevel = document.getElementById(`levelDiv-${id}`);
  removedLevel.remove();
  //remove from stack too!
  for (const i in stack) {
    if (stack[i].levelId == id) {
      stack.splice(i, 1);
    }
  }
  renderStack();
};

function listenerFunction(e) {
  e.preventDefault;
  if (e.target.tagName == "BUTTON") {
    levelDivRemove(e.target.id.slice(15));
  }
}

///functionality for levelDiv add button

addAboveBtn.addEventListener("click", function () {
  addLevel(`above`);
  stackDiv.removeEventListener("click", listenerFunction, true);
  stackDiv.addEventListener("click", listenerFunction, true);
});

addBelowBtn.addEventListener("click", function () {
  addLevel(`below`);
  stackDiv.removeEventListener("click", listenerFunction, true);
  stackDiv.addEventListener("click", listenerFunction, true);
});

btnReset.addEventListener("click", function () {
  location.reload();
});

stackDiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("level")) {
    e.target.classList.toggle("levelSpecial");
  }
});

const regexTest = /^(\d*\.?\d{0,2}|\b)$/;
calculator.addEventListener("beforeinput", (e) => {
  const inputType = e.inputType;

  if (inputType === "deleteContentBackward") {
    return;
  }

  if (!regexTest.test(e.data)) {
    e.preventDefault();
  }
});

addLevel();

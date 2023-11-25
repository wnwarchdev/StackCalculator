`use strict`;

const inputSqM = document.getElementById("inputSqM");
const inputSqFt = document.getElementById("inputSqFt");

const calcArea = function (area) {
  const result = area * 10.76391;
  return result;
};

inputSqM.addEventListener("click", function (e) {
  console.log("worked");
});

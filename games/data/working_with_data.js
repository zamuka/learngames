const pupils = require('./pupils.json');
let smartestGender;
let mediumMarkBoys = 0;
let allMarksBoys = 0;
let mediumMarkGirls = 0;
let allMarksGirls = 0;
let girlsCount = 0;
let boysCount = 0;
// let smartestInPhysics;
let smartest;

for (let i = 0; i < pupils.length; i = i + 1) {
  if (pupils[i].gender === 'female') {
    girlsCount = girlsCount + 1;
    allMarksGirls = allMarksGirls + pupils[i].marks.physics;
  }
  if (pupils[i].gender === 'male') {
    boysCount = boysCount + 1;
    allMarksBoys = allMarksBoys + pupils[i].marks.physics;
  }
}

mediumMarkBoys = allMarksBoys / boysCount;
mediumMarkGirls = allMarksGirls / girlsCount;

if (mediumMarkBoys < mediumMarkGirls) {
  smartestGender = 'Girls are better';
} else {
  smartestGender = 'Boys are better';
}

console.log(mediumMarkGirls);
console.log(girlsCount);
console.log(mediumMarkBoys);
console.log(boysCount);
console.log(smartestGender);
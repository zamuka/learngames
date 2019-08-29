const pupils = require('./pupils.json');


// const first = pupils[0];
console.log('There are ' + pupils.length + ' pupil(s) in a group');
// console.log(pupils);
// console.log(first.marks);
// console.log(first.marks.physics);

let boysCount = 0;

for (let i = 0; i < pupils.length; i = i + 1) {
  if (pupils[i].gender === 'male') {
    boysCount = boysCount + 1;
  }
}

function getMarksValue(person) {
  return person.marks.math
  + person.marks.literature
  + person.marks.physics
  + person.marks.chemistry;
}

// find the oldest pupil in the group
let oldest = pupils[0];
let smartest = pupils[0];
for (let i = 0; i < pupils.length; i = i + 1) {
  if (pupils[i].birthday < oldest.birthday) {
    oldest = pupils[i];
  }
  console.log(getMarksValue(pupils[i]));

  if (getMarksValue(pupils[i]) > getMarksValue(smartest)) {
    smartest = pupils[i];
  }
}

console.log('boysCount', boysCount);
console.log('oldest', oldest.name);
console.log(oldest);
console.log('smartest', smartest.name);
console.log(smartest);

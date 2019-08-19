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

// find the oldest pupil in the group
let oldest = pupils[0];
for (let i = 0; i < pupils.length; i = i + 1) {
  // add code here
}

console.log('boysCount', boysCount);
console.log('oldest', oldest.name);

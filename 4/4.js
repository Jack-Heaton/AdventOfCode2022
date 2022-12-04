const sample = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const fs = require("fs");
const input = fs.readFileSync(`input.txt`, "utf8");

let fullOverLaps = [];
let partialOverlaps = [];

const assignments = input.split("\n").forEach((r, i) => {
  const assignment = r.split(",").map((s) => {
    return s.split("-").map((s) => parseInt(s));
  });

  const [a, b] = assignment;

  let first, second;

  if (a[0] <= b[0]) {
    first = a;
    second = b;
  } else {
    first = b;
    second = a;
  }

  if (first[1] >= second[1] || first[0] === second[0]) {
    fullOverLaps.push([first, second]);
  } else {
    console.log(first, second);
  }

  if (second[0] <= first[1]) partialOverlaps.push([first, second]);
});

console.log(fullOverLaps.length);
console.log(partialOverlaps.length);

const fs = require("fs");
const sample = fs.readFileSync(`sample.txt`, "utf8");
const real = fs.readFileSync(`input.txt`, "utf8");

const miniSample = `noop
addx 3
addx -5`;

let input;

//input = miniSample;
//input = input || sample;
input = input || real;

const lines = input.split("\n");

const instructions = [];

//Cycle counter
let i = 0;

//Row count;
let r = 0;

let register = 1;

const majorCycles = [20, 60, 100, 140, 180, 220];

const rowBreaks = [40, 80, 120, 160, 200, 240];

const registerAtMajor = [];

let drawing = "";

let total = 0;

while (lines[i] || instructions.length) {
  if (lines[i]) {
    const line = lines[i].split(" ");

    instructions.push(0);

    if (line[0] === "addx") {
      instructions.push(parseInt(line[1]));
    }
  }

  if (i - r <= register + 1 && i - r >= register - 1) {
    drawing += "X";
  } else {
    drawing += " ";
  }

  register += instructions.shift();

  i++;

  if (i === rowBreaks[0]) {
    drawing += "\n";
    r += 40;
    rowBreaks.shift();
  }

  if (i === majorCycles[0] - 1) {
    const score = register * majorCycles.shift();
    registerAtMajor.push(score);
    total += score;
  }
}

console.log(registerAtMajor);
console.log(total);

console.log(drawing);

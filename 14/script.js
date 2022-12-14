const fs = require("fs");
const { parse } = require("path");
const sample = fs.readFileSync(`sample.txt`, "utf8");
const real = fs.readFileSync(`input.txt`, "utf8");

let input;

let current;
let end;

//input = input || sample;
input = input || real;

const parsed = input.split("\n").map((l) => {
  return l.split(" -> ").map((c) => {
    return c.split(",").map((n) => parseInt(n));
  });
});

let max = [0, 0];
let min = [Infinity, Infinity];

const map = [];

while (parsed.length) {
  const line = parsed.shift();

  while (line.length) {
    let [x, y] = line.shift();

    max[0] = Math.max(x, max[0]);
    min[0] = Math.min(x, min[0]);
    max[1] = Math.max(y, max[1]);
    min[1] = Math.min(y, min[1]);

    const next = line[0];

    if (next) {
      let direction = [next[0] - x, next[1] - y];
      direction = [
        direction[0] > 0 ? 1 : direction[0] < 0 ? -1 : 0,
        direction[1] > 0 ? 1 : direction[1] < 0 ? -1 : 0,
      ];

      //Draw line
      while (x !== next[0] || y !== next[1]) {
        if (!map[y]) map[y] = [];
        map[y][x] = "X";
        x += direction[0];
        y += direction[1];
      }
    } else {
      if (!map[y]) map[y] = [];
      map[y][x] = "X";
    }
  }
}

const w = max[0] - min[0];

//part 2 --- give additional space to fall
const h = max[1] + 2;

let fillEmpty = h;

while (fillEmpty > -1) {
  if (!map[fillEmpty]) map[fillEmpty] = new Array(max[0]);
  fillEmpty--;
}

// for (const row in map) {
//   console.log(map[row].slice(min[0], max[0]));
// }

let cycles = 0;

let complete = false;

while (!complete) {
  let x = 500;
  let y = 0;

  let stopped = false;

  //Part 2 stop condition
  if (map[y][x]) {
    console.log(cycles);
    break;
  }

  //Can't move once we hit bottom
  while (!stopped) {
    // Part 1 stop condition
    // if (!map[y + 1]) {
    //   console.log(cycles);
    //   complete = true;
    //   break;
    // }

    //Part two - magically appearing floor
    if (y === h - 1) {
      map[y + 1][x] = "F";
      map[y + 1][x - 1] = "F";
      map[y + 1][x + 1] = "F";
    }

    //Drop down first
    if (!map[y + 1][x]) {
      y++;
      //To the left
    } else if (!map[y + 1][x - 1]) {
      y++;
      x--;
    } else if (!map[y + 1][x + 1]) {
      y++;
      x++;
    } else {
      map[y][x] = "S";
      stopped = true;
    }
  }

  cycles++;
}

// for (const row in map) {
//   console.log(map[row].slice(min[0], max[0]).map((e) => e || "X"));
// }

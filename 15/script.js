const fs = require("fs");
const { parse } = require("path");
const sample = fs.readFileSync(`sample.txt`, "utf8");
const real = fs.readFileSync(`input.txt`, "utf8");

let input;

let current;
let end;

input = input || sample;
//input = input || real;

const target = 10;

const map = {};

const parsed = input.split("\n").map((l, i) => {
  const s = l.split(" ");

  const x = parseInt(s[2].split("=")[1]);
  const y = parseInt(s[3].split("=")[1]);
  const bx = parseInt(s[8].split("=")[1]);
  const by = parseInt(s[9].split("=")[1]);

  const d = Math.abs(bx - x) + Math.abs(by - y);

  //Sweep
  let sy = y - d;
  let sx = x;

  console.log(x, y, sy, sx, d);

  if (target >= y - d && target <= y + d) {
    //Top of sweep
    // while (sy <= y + d) {
    //point count either side
    sy = target;

    if (sy < y) {
      let pointCount = 2 * sy - y + d + 3;
      while (pointCount) {
        if (sy >= 0) {
          map[sy] = map[sy] || {};
          map[sy][sx + pointCount] = `${i}`;
        }

        pointCount--;
      }
      sx--;
    } else {
      let pointCount = 2 * sy - y + d + 3 - 4 * (sy - y);
      while (pointCount) {
        if (sy >= 0) {
          map[sy] = map[sy] || {};
          map[sy][pointCount + sx] = `${i}`;
        }

        pointCount--;
      }

      sx++;
    }

    sy++;
    // }
  }
});

let output = "";

console.log(map);

for (const r of map) {
  if (r) {
    for (const c of r) {
      output += !c ? " " : c;
    }
  }
  output += "\n";
}

console.log(output);

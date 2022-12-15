const fs = require("fs");
const sample = fs.readFileSync(`sample.txt`, "utf8");
const real = fs.readFileSync(`input.txt`, "utf8");

let map;

let input;

function prepInput(inputSource) {
  map = {};

  const parsed = inputSource.split("\n").map((l, i) => {
    const s = l.split(" ");

    const x = parseInt(s[2].split("=")[1]);
    const y = parseInt(s[3].split("=")[1]);
    const bx = parseInt(s[8].split("=")[1]);
    const by = parseInt(s[9].split("=")[1]);

    const d = Math.abs(bx - x) + Math.abs(by - y);

    // console.log(x, y, sy, sx, d);

    if (!map[y]) map[y] = {};
    if (!map[by]) map[by] = {};

    map[y][x] = {
      ...(map[y][x] || {}),
      sensor: true,
    };

    map[by][bx] = {
      ...(map[by][bx] || {}),
      beacon: true,
    };

    return {
      x,
      y,
      bx,
      by,
      d,
    };
  });

  return parsed;
}

function countCoverage(target, inputSource, limit) {
  if (!input) {
    input = prepInput(inputSource);
  }

  let unoccupied = 0;
  let scanned = 0;

  input.forEach((s) => {
    let { x, y, bx, by, d } = s;

    if (target >= y - d && target <= y + d) {
      const fromPoint = d - Math.abs(target - y);

      let coverage = fromPoint * 2 + 1;

      const start = x - Math.floor(coverage / 2) - 1;

      while (coverage) {
        if (
          start + coverage >= (limit ? 0 : -Infinity) &&
          start + coverage < (limit || Infinity)
        ) {
          if (!map[target]) map[target] = {};

          if (!map[target][start + coverage]) {
            unoccupied++;
          } else if (!map[target][start + coverage].coveredby) {
            scanned++;
          }

          map[target][start + coverage] = {
            ...(map[target][start + coverage] || {}),
            coveredby: [
              ...(map[target][start + coverage]?.coveredby || []),
              [x, y],
            ],
          };
        }

        coverage--;
      }
    }
  });

  //count unoccupied

  // let unoccupied = 0;

  // for (const k in map[target]) {
  //   const space = map[target][k];

  //   if (space.coveredby && !space.sensor && !space.beacon) {
  //     unoccupied++;
  //   }
  // }

  if (limit) {
    if (unoccupied + scanned < limit) {
      let i = 0;

      while (i < limit) {
        if (!map[target][i]) {
          return i * 4000000 + target;
        }
        i++;
      }
    }
  } else return;
  unoccupied;
}

input = undefined;
console.log(countCoverage(10, sample));
//input = undefined;
//console.log(countCoverage(2000000, real));

input = undefined;

let i = 0;

while (i < 20) {
  const solution = countCoverage(i, sample, 20);

  if (solution) {
    console.log(solution);
    break;
  }

  i++;
}

i = 0;

while (i < 4000000) {
  const solution = countCoverage(i, sample, 4000000);

  if (solution) {
    console.log(solution);
    break;
  }

  i++;
}

// let output = "";

// console.log(map);

// for (const r of map) {
//   if (r) {
//     for (const c of r) {
//       output += !c ? " " : c;
//     }
//   }
//   output += "\n";
// }

// console.log(output);

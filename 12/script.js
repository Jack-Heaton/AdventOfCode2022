const fs = require("fs");
const sample = fs.readFileSync(`sample.txt`, "utf8");
const real = fs.readFileSync(`input.txt`, "utf8");

let input;

let current;
let end;

//input = input || sample;
input = input || real;

const map = {};

input.split("\n").forEach((r, y) => {
  r.split("").forEach((c, x) => {
    if (!map[x]) map[x] = {};
    if (c === "S") {
      current = [x, y];
      map[x][y] = {
        x,
        y,
        z: 0,
      };
    } else if (c === "E") {
      end = [x, y];
      map[x][y] = {
        x,
        y,
        z: 26,
      };
    } else {
      map[x][y] = {
        x,
        y,
        z: c.charCodeAt(0) - 97,
      };
    }
  });
});

for (const x in map) {
  for (const y in map[x]) {
    const h = Math.abs(end[0] - x) + Math.abs(end[1] - y);
    map[x][y] = {
      ...map[x][y],
      distance: Math.abs(end[0] - x) + Math.abs(end[1] - y),
    };
  }
}

current = map[current[0]][current[1]];
current.cost = 0;
end = map[end[0]][end[1]];

const toEval = [current];

let bad = [];

let worst = [];

const path = [];

let cycle = 0;

while (toEval.length) {
  current = toEval.shift();

  const { x, y, z, distance } = current;

  // while (map[x][y].visited) {
  //   continue;
  // }

  console.log([x, y]);

  if (x === end.x && y === end.y) {
    path.push(end);

    while (current.parent) {
      current = current.parent;
      path.push(current);
    }

    //console.log("done", path);
    break;
  }

  current.visited = true;

  const dirs = {
    u: { x, y: y + 1 },
    d: { x, y: y - 1 },
    l: { x: x - 1, y },
    r: { x: x + 1, y },
  };

  toEval.push(
    ...Object.keys(dirs).reduce((c, d) => {
      const { x: dx, y: dy } = dirs[d];
      const neighbor = map[dx]?.[dy];

      const zDelta = neighbor?.z - z;

      if (neighbor && !neighbor.visited && Math.abs(zDelta) <= 1) {
        const cost = neighbor.distance + distance;

        if (!neighbor.cost || cost <= neighbor.cost) {
          neighbor.parent = current;
          neighbor.cost = cost;
        }

        if (zDelta === 1) {
          c.push(neighbor);
        } else if (zDelta === 0) {
          bad.push(neighbor);
        } else {
          worst.push(neighbor);
        }
      }
      return c;
    }, [])
  );

  toEval.sort((a, b) => a.distance - b.distance);
  bad.sort((a, b) => a.distance - b.distance);
  worst.sort((a, b) => a.distance - b.distance);

  // cycle++;

  // if (cycle === 1000) {
  //   console.log(map);
  //   break;
  // }
  if (!toEval.length && bad.length) {
    toEval.push(...bad);
    bad = [];
  } else if (!toEval.length && worst.length) {
    toEval.push(...worst);
    worst = [];
  }
}

console.log(path.length - 1);

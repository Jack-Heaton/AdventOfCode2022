const fs = require("fs");
const real = fs.readFileSync(`input.txt`, "utf8");

const sample = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const input = real;
//const input = sample;

function brokenRope({ ropeLength }) {
  //Head and tail positions

  let t = [];

  for (let i = 0; i < ropeLength; i++) {
    t.push([0, 0]);
  }

  const tailPositions = {
    "0,0": 1,
  };

  const moves = input.split("\n").map((l) => {
    m = l.split(" ");
    m[1] = parseInt(m[1]);
    return m;
  });

  const stepMap = {
    U: [0, -1],
    D: [0, 1],
    L: [-1, 0],
    R: [1, 0],
  };

  let moveNum = 0;

  for (const move of moves) {
    let steps = move[1];

    while (steps) {
      t[0] = t[0].map((p, i) => p + stepMap[move[0]][i]);

      let currentHead = t[0];

      for (let i = 1; i < ropeLength; i++) {
        const deltaX = currentHead[0] - t[i][0];
        const deltaY = currentHead[1] - t[i][1];

        //Horizontals
        if (Math.abs(deltaX) === 2) {
          //If diagonal, we'll move diagonal
          if (Math.abs(deltaY) === 1) {
            t[i][1] = t[i][1] + (deltaY > 0 ? 1 : -1);
          }

          t[i][0] = t[i][0] + (deltaX > 0 ? 1 : -1);
        }

        //Verticals
        if (Math.abs(deltaY) === 2) {
          //If diagonal, we'll move diagonal
          if (Math.abs(deltaX) === 1) {
            t[i][0] = t[i][0] + (deltaX > 0 ? 1 : -1);
          }

          t[i][1] = t[i][1] + (deltaY > 0 ? 1 : -1);
        }

        if (i === ropeLength - 1) {
          tailPositions[`${t[i][0]},${t[i][1]}`] =
            (tailPositions[`${t[i][0]},${t[i][1]}`] || 0) + 1;
        }
        currentHead = t[i];
      }

      steps--;
    }

    moveNum++;
  }

  console.log(Object.keys(tailPositions).length);
}

brokenRope({
  ropeLength: 2,
});

brokenRope({
  ropeLength: 10,
});

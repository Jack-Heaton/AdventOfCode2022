const fs = require("fs");
const real = fs.readFileSync(`input.txt`, "utf8");

const sample = `30373
25512
65332
33549
35390`;

const input = real;
//const input = sample;

const grid = input.split("\n").map((l) => l.split(""));

// console.log(grid);

const trees = {};

function checkVisible({
  tree,
  direction,
  x,
  y,
  visible = true,
  treesInPath = [],
}) {
  if (typeof x === "undefined") {
    ({ x, y } = tree);
  }

  const nextTreeX =
    x + (direction === "right" ? 1 : direction === "left" ? -1 : 0);

  const nextTreeY =
    y + (direction === "down" ? 1 : direction === "up" ? -1 : 0);

  //Edges
  if (nextTreeX < 0 || nextTreeX >= grid[0].length) {
    return { visible, treesInPath };
  }

  if (nextTreeY < 0 || nextTreeY >= grid.length) {
    return { visible, treesInPath };
  }

  //Get
  const nextTree = parseInt(grid[nextTreeY][nextTreeX]);
  treesInPath.push(nextTree);

  //Next tree blocks this tree
  if (nextTree >= tree.height) {
    return {
      visible: false,
      treesInPath,
    };

    //Check next in path
  } else {
    return checkVisible({
      tree,
      direction,
      x: nextTreeX,
      y: nextTreeY,
      visible,
      treesInPath,
    });
  }
}

let visibleCount = 0;
let maxScore = 0;

for (const y in grid) {
  for (const x in grid[y]) {
    if (!trees[x]) trees[x] = {};
    trees[x][y] = {
      height: parseInt(grid[y][x]),
      x: parseInt(x),
      y: parseInt(y),
    };

    let counted = false;

    const thisTree = trees[x][y];

    for (const direction of ["up", "left", "right", "down"]) {
      const visibility = checkVisible({
        tree: thisTree,
        direction,
      });

      if (visibility.visible) {
        thisTree.visible = true;

        if (!counted) {
          counted = true;
          visibleCount++;
        }
      }

      thisTree[direction] = visibility;
    }

    thisTree.score =
      thisTree.up.treesInPath.length *
      thisTree.down.treesInPath.length *
      thisTree.left.treesInPath.length *
      thisTree.right.treesInPath.length;

    maxScore = Math.max(thisTree.score, maxScore);
  }
}

console.log(visibleCount);
console.log(maxScore);

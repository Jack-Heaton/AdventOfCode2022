const fs = require("fs");

const sample = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

//const input = sample;
const input = fs.readFileSync(`input.txt`, "utf8");

const stacks = input.substring(0, input.indexOf("\n\n"));
const moves = input.substring(input.indexOf("\n\n") + 2);

//Parse stacks
const rawArray = stacks.split("\n").map((s) => s.split(""));

//Transpose stacks
const transposed = [];

for (let i = 0; i < rawArray[0].length; i++) {
  transposed.push([]);
  for (let j = rawArray.length - 1; j >= 0; j--) {
    transposed[i].push(rawArray[j][i]);
  }
}

//To map
const cargoMap = transposed.reduce((c, s) => {
  if (s[0] !== " ") {
    c[parseInt(s.shift())] = s.filter((crate) => crate !== " ");
  }
  return c;
}, {});

//parse moves
const moveList = moves.split("\n").map((m) =>
  m.split(" ").reduce((c, m, i) => {
    if (i % 2 !== 0) {
      c.push(parseInt(m));
    }
    return c;
  }, [])
);

const cargoMap2 = JSON.parse(JSON.stringify(cargoMap));

//Part 1
for (const move of moveList) {
  const [cratesToMove, sourceStack, destStack] = move;

  let partOneCratesToMove = cratesToMove;

  while (partOneCratesToMove) {
    cargoMap[destStack].push(cargoMap[sourceStack].pop());
    partOneCratesToMove--;
  }
}

outputSolution({ cargoMap });

//Part 2

for (const move of moveList) {
  const [cratesToMove, sourceStack, destStack] = move;

  const moveStack = cargoMap2[sourceStack].splice(
    cargoMap2[sourceStack].length - cratesToMove
  );
  cargoMap2[destStack].push(...moveStack);
}

outputSolution({ cargoMap: cargoMap2 });

//Output helper
function outputSolution({ cargoMap }) {
  const solution = Object.keys(cargoMap).reduce((c, s) => {
    c += cargoMap[s][cargoMap[s].length - 1];
    return c;
  }, "");

  console.log(solution);
}

const fs = require("fs");

const input = fs.readFileSync(`input.txt`, "utf8");

//Part 1//

let maxCalories = 0;

input.split("\n\n").forEach((p) => {
  const totalCaloriesInPack = p
    .split("\n")
    .reduce((c, cal) => c + parseInt(cal), 0);
  maxCalories = Math.max(maxCalories, totalCaloriesInPack);
});

console.log(maxCalories);

//Part 2//

const packs = input
  .split("\n\n")
  .reduce((c, elves) => {
    c.push(elves.split("\n").reduce((c, cal) => c + parseInt(cal), 0));
    return c;
  }, [])
  .sort((a, b) => b - a);

console.log(packs[0] + packs[1] + packs[2]);

//No sort needed//

let pack1 = 0;
let pack2 = 0;
let pack3 = 0;

input.split("\n\n").forEach((p) => {
  let totalCaloriesInPack = p
    .split("\n")
    .reduce((c, cal) => c + parseInt(cal), 0);

  if (totalCaloriesInPack > pack1) {
    const temp = pack1;
    pack1 = totalCaloriesInPack;
    totalCaloriesInPack = temp;
  }

  if (totalCaloriesInPack > pack2) {
    const temp = pack2;
    pack2 = totalCaloriesInPack;
    totalCaloriesInPack = temp;
  }

  if (totalCaloriesInPack > pack3) {
    const temp = pack3;
    pack3 = totalCaloriesInPack;
    totalCaloriesInPack = temp;
  }
});

console.log(pack1 + pack2 + pack3);

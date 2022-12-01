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

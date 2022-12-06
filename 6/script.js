const fs = require("fs");

const sample = `mjqjpqmgbljsphdztnvjfqwrcgsmlb`;

const input = fs.readFileSync(`input.txt`, "utf8");

let i = 0;

let solution = -1;

//Part 1
while (input[i]) {
  let seen = {
    [input[i]]: true,
  };

  if (!seen[input[i + 1]]) {
    seen[input[i + 1]] = true;
    if (!seen[input[i + 2]]) {
      seen[input[i + 2]] = true;
      if (!seen[input[i + 3]]) {
        solution = i + 4;
        break;
      }
    }
  }

  i++;
}

console.log(solution);

i = 0;

solution = -1;

//Part 2
while (input[i]) {
  let seen = {
    [input[i]]: true,
  };

  j = 1;

  while (j < 14) {
    if (!seen[input[i + j]]) {
      seen[input[i + j]] = true;
    } else {
      break;
    }

    j++;

    if (j === 14) {
      solution = i + j;
    }
  }

  if (solution > -1) {
    break;
  }

  i++;
}

console.log(solution);

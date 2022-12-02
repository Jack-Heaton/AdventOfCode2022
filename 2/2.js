const fs = require("fs");

let sample = `A Y
B X
C Z`;

const input = fs.readFileSync(`input.txt`, "utf8");

//Part 1//

let scoreMap = {
  AX: [1, 3, 1, 3],
  AY: [1, 0, 2, 6],
  AZ: [1, 6, 3, 0],
  BX: [2, 6, 1, 0],
  BY: [2, 3, 2, 3],
  BZ: [2, 0, 3, 6],
  CX: [3, 0, 1, 6],
  CY: [3, 6, 2, 0],
  CZ: [3, 3, 3, 3],
};

function playTourny({ input, scoreMap }) {
  let totalScore = 0;
  let i = 0;

  while (input[i]) {
    const theyPlayed = input[i];
    const youPlayed = input[i + 2];

    const roundScore = scoreMap[`${theyPlayed}${youPlayed}`];

    totalScore += roundScore[2] + roundScore[3];

    i += 4;
  }

  console.log(totalScore);
}

playTourny({ input, scoreMap });

//Part 2//

scoreMap = {
  AX: [1, 6, 3, 0],
  AY: [1, 3, 1, 3],
  AZ: [1, 0, 2, 6],
  BX: [2, 6, 1, 0],
  BY: [2, 3, 2, 3],
  BZ: [2, 0, 3, 6],
  CX: [3, 6, 2, 0],
  CY: [3, 3, 3, 3],
  CZ: [3, 0, 1, 6],
};

playTourny({ input, scoreMap });

const sample = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

function createOrUpdate({ startChar, scoreMap = {}, shift = 0 }) {
  let char = startChar.codePointAt();
  let start = char;
  let finish = char + 26;

  while (char < finish) {
    scoreMap[String.fromCharCode(char)] = char - start + 1 + shift;
    char++;
  }

  return scoreMap;
}

let scoreMap = createOrUpdate({ startChar: "a" });

scoreMap = createOrUpdate({ startChar: "A", scoreMap, shift: 26 });

const fs = require("fs");
const input = fs.readFileSync(`input.txt`, "utf8");

//Right on sample. What's the bug?//

// let i = 0;
// let ruckLen = 0;
// let seen = {};
// let seenMulti = {};
// let shift = 0;
// totalScore = 0;

// while (input[i]) {
//   const c = input[i];

//   if (c === "\n" || !input[i + 1]) {
//     const mid = ruckLen / 2;

//     for (const k in seenMulti) {
//       if (seenMulti[k].min < mid && seenMulti[k].max >= mid) {
//         totalScore += scoreMap[k];
//       }
//     }

//     ruckLen = 0;
//     seenMulti = {};
//     seen = {};
//     shift = i + 1;
//   } else {
//     if (!seen[c]) {
//       seen[c] = i - shift;
//     } else {
//       seenMulti[c] = {
//         max: i - shift,
//         min: seen[c],
//       };
//     }

//     ruckLen++;
//   }
//   i++;
// }

// console.log(totalScore);

const rucks = input.split("\n");

//Part 1 & 2
let totalScorePart1 = 0;
let totalScorePart2 = 0;
let elfInGroup = 0;
let packsInGroup = [];

for (const ruck of rucks) {
  const mid = ruck.length / 2;

  const seenFront = {};
  const seenBack = {};
  const counted = {};
  let scored = false;

  for (let i = 0; i < mid; i++) {
    const back = ruck[mid + i];
    const front = ruck[mid - i - 1];

    seenFront[front] = `${front}`;
    seenBack[back] = `${back}`;

    if (seenFront[back] && !counted[back]) {
      totalScorePart1 += scoreMap[back];
      counted[back] = true;
    } else if (seenBack[front] && !counted[front]) {
      totalScorePart1 += scoreMap[front];
      counted[front] = true;
    }

    if (elfInGroup === 2 && !scored) {
      if (packsInGroup[0][front] && packsInGroup[1][front]) {
        totalScorePart2 += scoreMap[front];
        scored = true;
      } else if (packsInGroup[0][back] && packsInGroup[1][back]) {
        totalScorePart2 += scoreMap[back];
        scored = true;
      }
    }
  }

  if (elfInGroup === 2) {
    packsInGroup = [];
    elfInGroup = 0;
  } else {
    packsInGroup.push({ ...seenBack, ...seenFront });
    elfInGroup++;
  }
}

console.log(totalScorePart1);
console.log(totalScorePart2);

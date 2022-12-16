const fs = require("fs");
const sample = fs.readFileSync(`sample.txt`, "utf8");
const real = fs.readFileSync(`input.txt`, "utf8");

let map = {};

const inputSource = sample;

let valves = {};

inputSource.split("\n").map((l, i) => {
  const s = l.split(" ");

  valves[s[1]] = {
    flow: parseInt(s[4].replace(";", "").split("=")[1]),
    leadsTo: s.slice(9).map((c) => c.replace(",", "")),
  };
});

console.log(valves);

function runMaze(
  room,
  visited,
  openValves = [],
  pressureRelased = 0,
  timeLeft = 30
) {
  if (timeLeft === 0) {
    return pressureRelased;
  }
}

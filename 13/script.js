const fs = require("fs");
const sample = fs.readFileSync(`sample.txt`, "utf8");
const real = fs.readFileSync(`input.txt`, "utf8");

let input;

input = input || sample;
//input = input || real;

const map = {};

const messages = input.split("\n\n").map((p) => {
  return p.split("\n").map((r) => JSON.parse(r));
});

const correctIndexes = [];

let cycle = 0;

messages.forEach((m, i) => {
  "---begin ", cycle++;
  if (evaluateItems(m[0], m[1]) === "correct") correctIndexes.push(i + 1);
});

console.log(correctIndexes.reduce((c, i) => c + i, 0));

function evaluateItems(right, left, log, depth = 0) {
  if (log) console.log("eval at depth ", depth);

  right = Array.isArray(left) && !Array.isArray(right) ? [right] : right;
  left = Array.isArray(right) && !Array.isArray(left) ? [left] : left;

  if (log) console.log("left over", right, left);

  if (!right.length && left.length) {
    return "correct";
  } else if (!left.length && right.length) {
    return "incorrect";
  }

  while (right.length && left.length) {
    if (log) console.log("starting", right, left);

    const r = right.shift();
    const l = left.shift();

    if (log) {
      console.log("values", r, l);
    }

    if (Array.isArray(r) || Array.isArray(l)) {
      const eval = evaluateItems(r, l, log, depth + 1);

      if (log) console.log("eval", eval);

      if (eval) {
        return eval;
      }
    }

    if (r < l) {
      return "correct";
    } else if (l < r) {
      return "incorrect";
    }

    if (log) console.log("left over", right, left);

    if (!right.length && left.length) {
      return "correct";
    } else if (!left.length && right.length) {
      return "incorrect";
    }
  }
}

const messages2 = input.split("\n").reduce((c, m) => {
  if (m) {
    c.push(JSON.parse(m));
  }
  return c;
}, []);

messages2.push([[2]], [[6]]);

const sorted = messages2.sort((a, b) => {
  const eval = evaluateItems(
    JSON.parse(JSON.stringify(a)),
    JSON.parse(JSON.stringify(b))
  );

  if (eval === "correct") {
    return -1;
  } else if (eval === "incorrect") {
    return 1;
  }

  return 0;
});

const dividers = [];

let i = 0;
while (dividers.length < 2) {
  if (messages2[i].length === 1 && messages2[i]?.[0].length === 1) {
    if ([2].includes(messages2[i][0][0])) {
      dividers.push(i + 1);
    } else if ([6].includes(messages2[i][0][0])) {
      dividers.push(i + 1);
      break;
    }
  }
  i++;
}

console.log(dividers);

console.log(dividers[0] * dividers[1]);

const fs = require("fs");
const sample = fs.readFileSync(`sample.txt`, "utf8");
const real = fs.readFileSync(`input.txt`, "utf8");

let input;

//input = input || sample;
input = input || real;

function getInitialMonkeys() {
  return input.split("\n\n").reduce((c, m) => {
    const monkey = {};

    m.split("\n").forEach((l, i) => {
      l = l.split(":")[1].trim();

      if (i === 1) {
        monkey.objects = l.split(", ").map((o) => BigInt(o));
      } else if (i === 2) {
        const ops = l.split(" ");

        monkey.inspect = {
          op: ops[3],
          with: ops[4] === "old" ? "self" : BigInt(ops[4]),
        };
      } else if (i === 3) {
        monkey.test = BigInt(l.split(" ")[2]);
      } else if (i === 4) {
        monkey.trueTo = parseInt(l.split(" ")[3]);
      } else if (i === 5) {
        monkey.falseTo = parseInt(l.split(" ")[3]);
      }
    });

    monkey.objectsInspected = BigInt(0);

    c.push(monkey);

    return c;
  }, []);
}

function runRounds({ roundCount, monkeys, relax = true }) {
  let round = 0;

  const commonMultiple = monkeys.reduce((c, m) => c * m.test, 1n);

  while (round < roundCount) {
    //Loop through monkeys
    monkeys.forEach((m, i) => {
      //Loop through objects
      while (m.objects.length) {
        let obj = m.objects.shift();

        //Calculate new objec value
        const w = m.inspect.with === "self" ? obj : m.inspect.with;
        obj = m.inspect.op === "+" ? obj + w : obj * w;

        if (relax) obj = obj / 3n;

        //Reduce number
        obj = obj % commonMultiple;

        //Test object value
        const test = obj % m.test === 0n;

        //Toss object
        monkeys[test ? m.trueTo : m.falseTo].objects.push(obj);

        monkeys[i].objectsInspected++;
      }
    });

    round++;
  }

  let first = 0n;
  let second = 0n;

  const objectCountsToSort = monkeys.map((m) => m.objectsInspected);

  while (objectCountsToSort.length) {
    let obj = objectCountsToSort.shift();

    if (obj > first) {
      const temp = first;
      first = obj;
      obj = temp;
    }
    if (obj > second) {
      objectCountsToSort.push(second);
      second = obj;
    }
  }

  console.log(first * second);
}

runRounds({
  roundCount: 20,
  monkeys: getInitialMonkeys(),
  relax: true,
});

runRounds({
  roundCount: 10000,
  monkeys: getInitialMonkeys(),
  relax: false,
});

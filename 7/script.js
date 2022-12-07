const fs = require("fs");
const real = fs.readFileSync(`input.txt`, "utf8");

const sample = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

const input = real; //sample;

const lines = input.split("\n");

const currentDirectoryPath = [];
const directories = {};

for (const l of lines) {
  //change directory
  if (l[0] === "$") {
    if (l.substring(0, 4) === "$ cd") {
      const path = l.substring(4).trim();
      if (path === "..") {
        currentDirectoryPath.pop();
      } else {
        currentDirectoryPath.push(path);

        directories[currentDirectoryPath.join("/")] = 0;
      }
    }
  } else if (l[0] !== "d") {
    let [size, filename] = l.split(" ");

    size = parseInt(size);
    filename = [...currentDirectoryPath, filename].join("/");

    const directoryWalk = [];

    for (const d of currentDirectoryPath) {
      directoryWalk.push(d);
      const p = directoryWalk.join("/");
      directories[p] += size;
    }
  }
}

let solution = 0;

for (const d in directories) {
  solution += directories[d] > 100000 ? 0 : directories[d];
}

//Part 1
console.log(solution);

//Part 2
const freeSpace = 70000000 - directories["/"];
const deleteTarget = 30000000 - freeSpace;

let solution2 = Infinity;

for (const d in directories) {
  if (directories[d] >= deleteTarget) {
    solution2 = Math.min(solution2, directories[d]);
  }
}

console.log(solution2);

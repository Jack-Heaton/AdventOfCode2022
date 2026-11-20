# Advent of Code 2022

My solutions to [Advent of Code 2022](https://adventofcode.com/2022), the yearly December run of daily programming puzzles. I do it as a fun warm-up exercise, usually until the puzzles start eating my evenings.

**Language:** JavaScript (Node.js)
**Progress:** Days 1–16

## Layout

Each day has its own folder (`1/` through `16/`) containing:

- the solution script: `N.js` for days 1–4, `script.js` from day 5 on
- `input.txt`, my puzzle input
- `sample.txt` (from day 10 on), the example from the puzzle description

## Running

Scripts read their input from the current directory, so run them from inside the day's folder:

```bash
cd 12
node script.js
```

To check the example answers, point the script at `sample.txt` instead of `input.txt`.

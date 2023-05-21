// https://contest.yandex.ru/contest/22450/run-report/87497282/
const _readline = require("readline");

const PLAYERS = 2;

/**
 * @param {number[]} board
 * @param {number} keysToPressPerPlayer
 * @returns {number}
 */
function countScore(board, keysToPressPerPlayer) {
  const keysPerTime = keysToPressPerPlayer * PLAYERS;
  const keyMap = new Map();
  board.forEach((key) => {
    const existedMapValue = keyMap.get(key) || 0;
    keyMap.set(key, existedMapValue + 1);
  });

  let result = 0;
  for (let i = 0; i < 10; i++) {
    const keyMapValue = keyMap.get(i);
    if (keyMapValue <= keysPerTime) {
      result++;
    }
  }

  return result;
}

// System -----------------------------------------------

const _reader = _readline.createInterface({ input: process.stdin });
const _inputLines = [];
_reader.on("line", (line) => _inputLines.push(line));
process.stdin.on("end", () => prepareData(_inputLines, process.stdout.write.bind(process.stdout)));

/**
 * @param {string[]} inputLines
 * @param { (str: string) => any} print
 */
function prepareData(inputLines, print) {
  const keysToPressPerPlayer = Number(inputLines[0]);
  const board = (inputLines[1] + inputLines[2] + inputLines[3] + inputLines[4]).split("").map(Number);
  return print(countScore(board, keysToPressPerPlayer).toString());
}

// Для тестов
module.exports = { testMe: prepareData };

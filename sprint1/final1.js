// https://contest.yandex.ru/contest/22450/run-report/87497856/
const _readline = require("readline");

/**
 * @param {number[]} houseNumberList
 * @returns {string}
 */
function countDistances(houseNumberList) {
  /** @type {number[]} */
  const nearestDistanceList = [];
  let lastFreeIndex = -1;

  houseNumberList.forEach((houseNumber, i) => {
    if (houseNumber === 0) {
      lastFreeIndex = i;
      recountPrevNearestDistances(nearestDistanceList, i);
      nearestDistanceList[i] = 0;
    } else if (lastFreeIndex >= 0) {
      nearestDistanceList[i] = i - lastFreeIndex;
    } else {
      nearestDistanceList[i] = -1;
    }
  });

  return nearestDistanceList.join(" ");
}

/**
 * @param {number[]} nearestDistanceList
 * @param {number} currentIndex
 */
function recountPrevNearestDistances(nearestDistanceList, currentIndex) {
  for (let i = currentIndex - 1; i >= 0; i--) {
    const newNearestDistance = currentIndex - i;
    const oldNearestDistance = nearestDistanceList[i];
    if (oldNearestDistance === -1 || newNearestDistance < oldNearestDistance) {
      nearestDistanceList[i] = newNearestDistance;
    } else {
      break;
    }
  }
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
  const houseNumberList = inputLines[1].trim().split(" ").map(Number);
  return print(countDistances(houseNumberList).toString());
}

// Для моих локальных автотестов
module.exports = { testMe: prepareData };

const _readline = require("readline");

class MyQueueSized {
  /** @param {number} n */
  constructor(n) {
    /** @type {(number | null)[]} n */
    this._array = new Array(n).fill(null);
    this._head = 0;
    this._tail = 0;
    this._maxSize = n;
    this._size = 0;
  }

  isEmpty = () => {
    return this._size === 0;
  };

  push = (/** @type {number} */ x) => {
    if (this._size < this._maxSize) {
      this._array[this._tail] = x;
      this._tail = (this._tail + 1) % this._maxSize;
      this._size += 1;
    } else {
      return "error";
    }
  };

  pop = () => {
    if (this.isEmpty()) {
      return "None";
    }
    const number = this._array[this._head];
    this._array[this._head] = null;
    this._size -= 1;
    this._head = (this._head + 1) % this._maxSize;
    // @ts-ignore
    return number.toString();
  };

  peek = () => {
    if (this.isEmpty()) {
      return "None";
    }
    // @ts-ignore
    return this._array[this._head].toString();
  };

  size = () => {
    return this._size.toString();
  };
}

/**
 * @param {number} queueSize
 * @param {[string, number | undefined][]} scenarios
 * @returns {string}
 */
function solve(queueSize, scenarios) {
  const queue = new MyQueueSized(queueSize);
  /** @type {string[]} */
  let response = [];
  scenarios.forEach((scenario) => {
    const [command, number] = scenario;
    switch (command) {
      case "peek": {
        response.push(queue.peek());
        break;
      }
      case "pop": {
        response.push(queue.pop());
        break;
      }
      case "push": {
        // @ts-ignore
        const error = queue.push(number);
        if (error) response.push(error);
        break;
      }
      case "size": {
        response.push(queue.size());
        break;
      }
    }
  });

  return response.join("\n");
}

// System -----------------------------------------------

const _reader = _readline.createInterface({ input: process.stdin });
const _inputLines = [];
_reader.on("line", (line) => _inputLines.push(line));
process.stdin.on("end", () => prepareData(_inputLines, process.stdout.write.bind(process.stdout)));

/**
 * @param {string[]} inputLines
 * @param {(str: string) => any} print
 */
function prepareData(inputLines, print) {
  /** @type {number} */
  const queueSize = Number(inputLines[1].trim());
  /** @type {[string, number | undefined][]} */
  const scenarios = [];
  for (let i = 2; i < inputLines.length; i++) {
    const [command, string] = inputLines[i].trim().split(" ");
    scenarios.push([command, string ? Number(string) : undefined]);
  }
  return print(solve(queueSize, scenarios).toString());
}

// Для моих локальных автотестов
module.exports = { testMe: prepareData };

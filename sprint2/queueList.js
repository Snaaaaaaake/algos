const _readline = require("readline");

class ListNode {
  /**
   * @param {string} value
   * @param {ListNode | null} next
   * @param {ListNode | null} prev
   */
  constructor(value, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }
}

class Queue {
  /** @type {ListNode | null} */
  _head = null;
  /** @type {ListNode | null} */
  _tail = null;
  _size = 0;

  get = () => {
    if (!this._head) {
      return "error";
    }

    const value = this._head.value;
    this._head = this._head.next;
    this._size -= 1;
    if (!this._head) {
      this._tail = null;
    }
    return value;
  };

  put = (/** @type {string} */ value) => {
    if (!this._tail) {
      this._tail = this._head = new ListNode(value);
    } else {
      this._tail = this._tail.next = new ListNode(value);
    }
    this._size += 1;
  };

  size = () => {
    return this._size.toString();
  };
}

/**
 * @param {[string, string | undefined][]} scenarios
 * @returns {string}
 */
function solve(scenarios) {
  const queue = new Queue();
  /** @type {string[]} */
  let response = [];
  scenarios.forEach((scenario) => {
    const [command, string] = scenario;
    switch (command) {
      case "get": {
        response.push(queue.get());
        break;
      }
      case "put": {
        // @ts-ignore
        queue.put(string);
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
  /** @type {[string, string | undefined][]} */
  const scenarios = [];
  for (let i = 1; i < inputLines.length; i++) {
    const [command, string] = inputLines[i].trim().split(" ");
    scenarios.push([command, string]);
  }
  return print(solve(scenarios).toString());
}

// Для моих локальных автотестов
module.exports = { testMe: prepareData };

const _readline = require("readline");

const OPERATORS = new Set(["-", "+", "/", "*"]);

class Stack {
  static ERROR_MESSAGE = "error";

  /** @type {number[]}*/
  _stack = [];

  /** @param {number} value */
  push = (value) => {
    this._stack.push(value);
  };

  /** @returns {number} value */
  pop = () => {
    // По условиям текущей задачи такого произойти не должно
    if (!this._stack.length) {
      throw new Error(Stack.ERROR_MESSAGE);
    }

    // @ts-ignore
    return this._stack.pop();
  };
}

/**
 * @param {Array<string | number>} data
 * @returns {string}
 */
function count(data) {
  const stack = new Stack();

  data.forEach((numberOrOperator) => {
    // Если число, то добавляем в стек
    if (typeof numberOrOperator === "number") {
      stack.push(numberOrOperator);
      return;
    }

    // Если оператор, то извлекаем два последних числа, производим над ними операцию и добавляем в стек
    const rightNumber = stack.pop();
    const leftNumber = stack.pop();
    /** @type {number} */
    let newNumber;
    switch (numberOrOperator) {
      case "+": {
        newNumber = leftNumber + rightNumber;
        break;
      }
      case "-": {
        newNumber = leftNumber - rightNumber;
        break;
      }
      case "*": {
        newNumber = leftNumber * rightNumber;
        break;
      }
      case "/": {
        newNumber = Math.floor(leftNumber / rightNumber);
        break;
      }
      default: {
        // Такого в задаче случиться не должно
        throw new Error();
      }
    }
    stack.push(newNumber);
  });

  // Извлекаем из стека значение, оно и должно быть нашем результатом
  return stack.pop().toString();
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
  /** @type {Array<string | number>} */
  const inputData = inputLines[0]
    .trim()
    .split(" ")
    .map((string) => (OPERATORS.has(string) ? string : Number(string)));
  return print(count(inputData).toString());
}

// Для моих локальных автотестов
module.exports = { testMe: prepareData };

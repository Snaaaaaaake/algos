// https://contest.yandex.ru/contest/22781/run-report/87762608/
const _readline = require("readline");

/*
-- ПРИНЦИП РАБОТЫ --
В задаче явно сказано, реализовать через стек, что я и сделал. Т.к. числа и операторы идут по порядку, то нам достаточно по порядку их и обрабатывать, сразу и числа, и операции над ними.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
По условиям задачи числа и знаки идут в строгом порядке. 
Вначале идёт как минимум две цифры, соответственно мы можем провести математическую операцию по знаку над этими числами. 
Результат операции кладётся обратно в стек и продолжается обработка следующих входных данных.
Таким образом всегда есть минимум две цифры, над которыми можно провести операцию (если не нарушена последовательность ввода, но это противоречит условию задачи).
Если в самом конце останется более двух чисел, то по условию мы извлекаем последнее.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Проходя по массиву входных данных мы в худшем случае совершаем 3 действия с внутренним массивом, иначе одно. 
Все действия выполняются за O(1) по условиям языка (нативные методы массива методы push и pop). 
Количество действий константно.
Соответственно сложность равна O(n).

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
В худшем случае каждое входное значение нам нужно поместить в массив (если приходят только цифры без операторов), поэтому сложность получается O(n).
*/

/** @type {Record<string, (a: number, b: number) => number>} */
const Operations = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => Math.floor(a / b),
};

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
    // По условиям задачи тут обязательно придёт оператор
    const result = Operations[numberOrOperator](leftNumber, rightNumber);
    stack.push(result);
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
    .map((string) => (Operations[string] ? string : Number(string)));
  return print(count(inputData).toString());
}

// Для моих локальных автотестов
module.exports = { testMe: prepareData };

// https://contest.yandex.ru/contest/22781/run-report/87758347/
const _readline = require("readline");

/*
-- ПРИНЦИП РАБОТЫ --
Дек реализован с помощью закольцованного массива. 
Присутствуют индексы головы и хвоста массива, которые сдвигаются в зависимости от вызванных команд. Также присутствует свойство текущего размера.
Отдельно обрабатываются случаи пустого дека и переполненного, чтобы предотвратить некорректное смещение индексов.
За основу взята реализация очереди из Практикума.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --
Взятый за основу массив гарантирует консистентный порядок положенных в него элементов. 
Нам остаётся правильно обрабатывать при вызове каждой команды сдвиг индексов начала и конца.
При добавлении в конец сдвигать индекс конца на один вперёд (с учетом закольцованности), 
в начало - на один назад, подобным образом и при удалении. 
Отельно сбрасывать индексы, когда список становится пустым. 
А также проверять, что мы не пытаемся превысить максимально допустимый размер, чтобы не получилось, что индекс конца превысил индекс начала.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --
Любой из методов выполняет либо добавление, либо удаление данных (и константные вычисления) из внутреннего массива по индексу головы/хвоста, а это O(1). 
На вход подаётся n команд, к каждой из которых нужно применить один из методов. Следовательно общая сложность будет O(n)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Т.к. дек основан на массиве, то размер потребляемой памяти будет O(k), где k это переданный размер дека.
Поэтому общее потребление памяти будет O(n).
*/

class Deq {
  static ERROR_MESSAGE = "error";

  /** @param {number} n */
  constructor(n) {
    /** @type {Array<number | null>} */
    this._stack = new Array(n).fill(null);
    this._head = 0;
    this._tail = 0;
    /** @type {number} n */
    this._maxSize = n;
    this._size = 0;
  }

  /** @param {number} value */
  pushBack = (value) => {
    // Проверяем, что допустимый размер не достиг лимита (проверка на "больше" не нужна, т.к. увеличивается всегда на 1)
    if (this._isFull()) {
      return Deq.ERROR_MESSAGE;
    }

    // Нужно отдельно обработать кейс пустого списка, чтобы _head и _tail ссылались на одно место, иначе указатели разъедутся
    if (this._isEmpty()) {
      this._head = 0;
      this._tail = 0;
      this._stack[this._head] = value;
    } else {
      // Смещаем индекс хвоста (с учетом закольцованности)
      // Здесь и далее нам не надо проверять, что _head и _tail могут пересечься, благодаря свойству size которое проверяется во всех методах и при переполнении просто отдаёт ошибку, препятствуюя созданию некорректных индексов
      this._tail = (this._tail + 1) % this._maxSize;
      // Добавляем в индекс хвоста наши данные
      this._stack[this._tail] = value;
    }

    // Увеличиваем размер
    this._size += 1;
  };

  // Реализация идентична pushBack
  /** @param {number} value */
  pushFront = (value) => {
    if (this._isFull()) {
      return Deq.ERROR_MESSAGE;
    }

    if (this._isEmpty()) {
      this._head = 0;
      this._tail = 0;
      this._stack[this._head] = value;
    } else {
      this._head = (this._head - 1 + this._maxSize) % this._maxSize;
      this._stack[this._head] = value;
    }
    this._size += 1;
  };

  popBack = () => {
    // Проверяем, что не пустой
    if (this._isEmpty()) {
      return Deq.ERROR_MESSAGE;
    }

    // Получаем требуемые данные, чтобы впоследствии их отдать
    const response = this._stack[this._tail];
    // Зануляем освободившееся место (чистим память)
    this._stack[this._tail] = null;
    // Уменьшаем размер
    this._size -= 1;
    // Смещаем хвостовой индекс (с учетом закольцованности)
    this._tail = (this._tail - 1 + this._maxSize) % this._maxSize;
    // @ts-ignore
    return response.toString();
  };

  // Реализация идентична popBack
  popFront = () => {
    if (this._isEmpty()) {
      return Deq.ERROR_MESSAGE;
    }

    const response = this._stack[this._head];
    this._stack[this._head] = null;
    this._size -= 1;
    this._head = (this._head + 1) % this._maxSize;
    // @ts-ignore
    return response.toString();
  };

  _isEmpty = () => {
    return this._size === 0;
  };

  _isFull = () => {
    return this._size === this._maxSize;
  };
}

/**
 * @param {number} deqSize
 * @param {[string, number | undefined][]} scenarios
 * @returns {string}
 */
function solve(deqSize, scenarios) {
  const deq = new Deq(deqSize);
  /** @type {string[]} */
  let response = [];

  scenarios.forEach((scenario) => {
    const [command, number] = scenario;
    let error;

    switch (command) {
      case "push_back": {
        // @ts-ignore
        error = deq.pushBack(number);
        break;
      }
      case "push_front": {
        // @ts-ignore
        error = deq.pushFront(number);
        break;
      }
      case "pop_front": {
        response.push(deq.popFront());
        break;
      }
      case "pop_back": {
        response.push(deq.popBack());
        break;
      }
    }

    if (error) {
      response.push(error);
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
  const deqSize = Number(inputLines[1].trim());
  /** @type {[string, number | undefined][]} */
  const scenarios = [];
  for (let i = 2; i < inputLines.length; i++) {
    const [command, string] = inputLines[i].trim().split(" ");
    scenarios.push([command, string ? Number(string) : undefined]);
  }
  return print(solve(deqSize, scenarios).toString());
}

// Для моих локальных автотестов
module.exports = { testMe: prepareData };

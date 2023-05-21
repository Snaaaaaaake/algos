const testMe = require("./main").testMe;

const logger = (/** @type {string} */ str) => str;

test("main", () => {
  const test1 = ["5", "0 1 4 9 0"];
  expect(testMe(test1, logger)).toBe("0 1 2 1 0");
  const test2 = ["6", "0 7 9 4 8 20"];
  expect(testMe(test2, logger)).toBe("0 1 2 3 4 5");
});

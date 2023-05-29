const testMe = require("./main").testMe;

const logger = (/** @type {string} */ str) => str;

test("main1", () => {
  const test1 = ["2 1 + 3 *"];
  expect(testMe(test1, logger)).toBe("9");
  const test2 = ["7 2 + 4 * 2 +"];
  expect(testMe(test2, logger)).toBe("38");
});

// const solution = require("./main").solution;

// class Node1 {
//   /**
//    * @param {string | null} value
//    * @param {Node1 | null} next
//    */
//   constructor(value = null, next = null) {
//     this.value = value;
//     this.next = next;
//   }
// }

// test("special", () => {
//   const node3 = new Node1("node3");
//   const node2 = new Node1("node2", node3);
//   const node1 = new Node1("node1", node2);
//   const node0 = new Node1("node0", node1);
//   const newHead = solution(node0, 1);
//   expect(newHead.value).toBe("node0");
//   expect(newHead.next.value).toBe("node2");
//   expect(newHead.next.next.value).toBe("node3");
// });

// test("special2", () => {
//   const node3 = new Node1("node3");
//   const node2 = new Node1("node2", node3);
//   const node1 = new Node1("node1", node2);
//   const node0 = new Node1("node0", node1);
//   const newHead = solution(node0, 0);
//   expect(newHead.value).toBe("node1");
//   expect(newHead.next.value).toBe("node2");
//   expect(newHead.next.next.value).toBe("node3");
// });

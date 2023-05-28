const testMe = require("./main").testMe;

const logger = (/** @type {string} */ str) => str;

test("main1", () => {
  const test1 = ["4", "4", "push_front 861", "push_front -819", "pop_back", "pop_back"];
  expect(testMe(test1, logger)).toBe(`861\n-819`);
  const test2 = ["7", "10", "push_front -855", "push_front 0", "pop_back", "pop_back", "push_back 844", "pop_back", "push_back 823"];
  expect(testMe(test2, logger)).toBe(`-855\n0\n844`);
  const test3 = ["6", "6", "push_front -201", "push_back 959", "push_back 102", "push_front 20", "pop_front", "pop_back"];
  expect(testMe(test3, logger)).toBe(`20\n102`);
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

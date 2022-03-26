const assert = require("assert");

// PASS test
describe("Simple test suite:", function () {
  it("1 === 1 should be true", function () {
    assert(1 === 1);
  });
});

// FAIL test
// describe("Simple test suite:", function () {
//   it("1 === 2 should be false", function () {
//     assert(1 === 2);
//   });
// });

/**
 * @jest-environment jsdom
 */

const sum = require("./script");
it("Test providing", () => {
  const result = sum(1, 2);
  expect(result).toBe(3);
});

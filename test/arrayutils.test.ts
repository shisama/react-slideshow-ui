import { isEmptyArray } from "../src/arrayutils";

describe("arrayutils", () => {
  describe("isEmptyArray", () => {
    it("should return true when argument is empty", () => {
      expect(isEmptyArray([])).toBeTruthy();
    });
    it("should return true when argument is null", () => {
      expect(isEmptyArray(null)).toBeTruthy();
    });
    it("should return true when argument is undefined", () => {
      expect(isEmptyArray(undefined)).toBeTruthy();
    });
    it("should return true when argument is not empty", () => {
      expect(isEmptyArray(["test"])).toBeFalsy();
    });
  });
});

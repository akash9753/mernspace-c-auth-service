import { calculateDiscount } from "./src/utils";

describe.skip("App", () => {
    it("should calculate the discount", () => {
        const result = calculateDiscount(100, 10);
        expect(result).toBe(10);
    });
});

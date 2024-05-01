import { currencyformat } from "../scripts/utils/currency"; 

describe("test suite : currency format", () => {
    it("test with normal numbers", () => {
        console.log(expect(currencyformat(2095)).toEqual("20.95"));
    });
});
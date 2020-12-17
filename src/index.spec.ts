import { helloWorld } from "./index";

describe("helloWorld", () => {
  it("should return Hello World", () => {
    expect(helloWorld()).toEqual("Hello World");
  });
});

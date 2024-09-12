"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
describe("Test the functions", () => {
    it("creates a new json file for tasks", () => {
        const newTask = "This is a new file";
        (0, functions_1.addToJsonFile)(newTask, "this is a description");
    });
});

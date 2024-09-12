import { addToJsonFile } from "./functions"

describe("Test the functions",() => {
    it("creates a new json file for tasks", () =>{
        const newTask ="This is a new file"
        addToJsonFile(newTask,"this is a description")
    })
})
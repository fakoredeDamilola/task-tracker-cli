"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addToJsonFile = addToJsonFile;
exports.updateTaskInJSONFile = updateTaskInJSONFile;
exports.deleteTaskINJSONFile = deleteTaskINJSONFile;
exports.updateTaskStatus = updateTaskStatus;
exports.listTaskByStatus = listTaskByStatus;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const enum_1 = require("./enum");
const filePath = path_1.default.join(__dirname, "/tasks.json");
function addToJsonFile(task, description) {
    const newTask = {
        id: 1,
        name: task,
        status: enum_1.Status["in-progress"],
        description: description ?? "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    if (fs_1.default.existsSync(filePath)) {
        const fileContent = fs_1.default.readFileSync(filePath, "utf-8");
        const tasks = JSON.parse(fileContent);
        const getLastID = tasks[tasks.length - 1].id;
        const newID = getLastID + 1;
        tasks.push({ ...newTask, id: newID });
        fs_1.default.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
        console.log("File updated successfully!");
    }
    else {
        const tasks = [{ ...newTask, id: 1 }];
        fs_1.default.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
        console.log("File created successfully!");
    }
}
function updateTaskInJSONFile(taskId, description) {
    if (!fs_1.default.existsSync(filePath)) {
        return "No task found";
    }
    else {
        const fileContent = fs_1.default.readFileSync(filePath, "utf-8");
        const tasks = JSON.parse(fileContent);
        const taskIndex = checkForTask(taskId, tasks);
        if (taskIndex === "not found") {
            console.log("task with ID not found");
            return;
        }
        else {
            const task = tasks.splice(taskIndex, 1)[0];
            task.description = description;
            task.updatedAt = new Date().toISOString();
            tasks.push(task);
            fs_1.default.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
            console.log("task updated");
        }
    }
}
function deleteTaskINJSONFile(taskId) {
    if (!fs_1.default.existsSync(filePath)) {
        return "No task found";
    }
    else {
        const fileContent = fs_1.default.readFileSync(filePath, "utf-8");
        const tasks = JSON.parse(fileContent);
        const taskIndex = checkForTask(taskId, tasks);
        if (taskIndex === "not found") {
            console.log("task with ID not found");
            return;
        }
        else {
            tasks.splice(taskIndex, 1);
            fs_1.default.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
            console.log("task deleted");
        }
    }
}
function updateTaskStatus(taskId, status) {
    if (!fs_1.default.existsSync(filePath)) {
        return "No task found";
    }
    else {
        const fileContent = fs_1.default.readFileSync(filePath, "utf-8");
        const tasks = JSON.parse(fileContent);
        const taskIndex = checkForTask(taskId, tasks);
        if (taskIndex === "not found") {
            console.log("task with ID not found");
            return;
        }
        else {
            const statusValue = status.slice(5);
            const task = tasks.splice(taskIndex, 1)[0];
            task.status = enum_1.Status[statusValue];
            task.updatedAt = new Date().toISOString();
            tasks.push(task);
            fs_1.default.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
            console.log("updated task status successfully");
        }
    }
}
function listTaskByStatus(status) {
    if (!fs_1.default.existsSync(filePath)) {
        return "No task found";
    }
    else {
        const fileContent = fs_1.default.readFileSync(filePath, "utf-8");
        const tasks = JSON.parse(fileContent);
        const taskByStatus = tasks.filter((task) => task.status === status);
        console.log(taskByStatus);
    }
}
function checkForTask(taskId, tasks) {
    const taskIndex = tasks.findIndex((task) => task.id === taskId);
    if (taskIndex === -1) {
        return "not found";
    }
    else {
        return taskIndex;
    }
}

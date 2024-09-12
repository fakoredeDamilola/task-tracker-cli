#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const functions_1 = require("./functions");
const program = new commander_1.Command();
program
    .action(() => {
    console.log("Hello, World!");
})
    .argument("<string>", "string to log")
    .option("-c, --capitalize", "Capitalize the message")
    .action((message, opts) => {
    if (opts.capitalize) {
        console.log(`Hello ${message}`.toUpperCase());
    }
    else {
        console.log(message);
    }
})
    .description("Say hello, this is the description");
program.command("add <add-a-task> <task-description>").action((task, description) => {
    if (task) {
        (0, functions_1.addToJsonFile)(task, description);
    }
})
    .description("add a new task to do");
program.command("update <id> <update-task>").action((taskId, newTask) => {
    if (taskId && newTask) {
        (0, functions_1.updateTaskInJSONFile)(parseInt(taskId), newTask);
    }
})
    .description("update a task");
program.command("delete <id>").action((taskId) => {
    if (taskId) {
        (0, functions_1.deleteTaskINJSONFile)(parseInt(taskId));
    }
})
    .description("delete a task");
program.command("update-status <id> <status>").action((taskId, status) => {
    if (taskId && status.startsWith("mark-")) {
        (0, functions_1.updateTaskStatus)(parseInt(taskId), status);
    }
})
    .description("update task status");
program.command("list-task <status>").action((status) => {
    if (status) {
        (0, functions_1.listTaskByStatus)(status);
    }
})
    .description("list task by status");
program.parse(process.argv);

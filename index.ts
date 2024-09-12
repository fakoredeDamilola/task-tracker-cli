#!/usr/bin/env node

import { Command } from "commander";
import { addToJsonFile, deleteTaskINJSONFile, listTaskByStatus, updateTaskInJSONFile, updateTaskStatus } from "./functions";
import { Status } from "./enum";

const program = new Command();

program
  .action(() => {
    console.log("Hello, World!");
  })
  .argument("<string>", "string to log")
  .option("-c, --capitalize", "Capitalize the message")
  .action(
    (
      message: string,
      opts: {
        capitalize?: boolean;
      }
    ) => {
      if (opts.capitalize) {
        console.log(`Hello ${message}`.toUpperCase());
      } else {
        console.log(message);
      }
    }
  )
  .description("Say hello, this is the description");

program.command("add <add-a-task> <task-description>").action((task: string,description:string) => {
    if(task){
         addToJsonFile(task,description)
    }
})
.description("add a new task to do")

program.command("update <id> <update-task>").action((taskId: string,newTask:string) => {
  if(taskId && newTask){
      updateTaskInJSONFile(parseInt(taskId),newTask)
  }
})
.description("update a task")

program.command("delete <id>").action((taskId: string) => {
    if(taskId){
        deleteTaskINJSONFile(parseInt(taskId))
    }
  })
  .description("delete a task")

program.command("update-status <id> <status>").action((taskId: string,status:string) => {
    if(taskId && status.startsWith("mark-")){
updateTaskStatus(parseInt(taskId),status)
    }
  })
  .description("update task status")

program.command("list-task <status>").action((status:Status) => {
    if(status){
listTaskByStatus(status)
    }
  })
  .description("list task by status")



program.parse(process.argv);
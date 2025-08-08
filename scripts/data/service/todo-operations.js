import { Task } from "../model/todo-Model.js";
export const todoOperations = {
    tasks:[],
    add(taskObject){
        let task = new Task();
        for(let key in taskObject){
            task[key] = taskObject[key];
        }
        this.tasks.push(taskObject);
        console.log("Task added successfully:", this.task);

    },
    search(){},
    sort(){}
}
import { TodoType } from "@/configs/datatypes";
import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
const todoJsonFilePath = "src/app/utils/todo.json"


import { NextRequest, NextResponse } from "next/server"

export async function PUT(req: NextRequest) {
    console.log("Inside the PUT handler")
    const request = await req.json()
    try {
        const todo = request.todo
        const todoJsonFile: any = await readFile(todoJsonFilePath)
        const todoData: Array<TodoType> = await JSON.parse(todoJsonFile) ?? []
        let existingTodoIndex = todoData.findIndex((existingTodo: TodoType) => existingTodo?.id === todo.id)
        if(existingTodoIndex !== -1) {     
            todoData[existingTodoIndex] = {...todo}
        }
        console.log(todoData)
        await writeFile(todoJsonFilePath, JSON.stringify(todoData))
        return NextResponse.json({
            type: "success",
            message: "Todo edited successfully",
            todoId: todo.id
        })


    } catch (err) {
        console.log(err)
    }

}
import { TodoType } from "@/configs/datatypes";
import { readFile, writeFile } from "fs/promises";
const todoJsonFilePath = "src/app/utils/todo.json"


import { NextRequest, NextResponse } from "next/server"

export async function DELETE(req: NextRequest) {
    console.log("Inside the Delete handler")
    const request = await req.json()
    try {
        const todoId = request.todoId
        const todoJsonFile: any = await readFile(todoJsonFilePath)
        const todoData: Array<TodoType> = await JSON.parse(todoJsonFile) ?? []
        const updatedTodoData = todoData?.filter((existingTodo: TodoType) => existingTodo?.id !== todoId)
        
        await writeFile(todoJsonFilePath, JSON.stringify(updatedTodoData))
        return NextResponse.json({
            type: "success",
            message: "Todo deleted successfully",
        })


    } catch (err) {
        console.log(err)
    }

}
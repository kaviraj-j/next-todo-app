import { TodoType } from "@/configs/datatypes";
import { randomUUID } from "crypto";
import { readFile, writeFile } from "fs/promises";
const todoJsonFilePath = "src/app/utils/todo.json"


import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const request = await req.json()
    try {
        const todo: TodoType = request.todo
        todo.id = randomUUID()
        const todoJsonFile: any = await readFile(todoJsonFilePath)
        const todoData = await JSON.parse(todoJsonFile)
        todoData.push(todo)
        await writeFile(todoJsonFilePath, JSON.stringify(todoData))
        return NextResponse.json({
            type: "success",
            message: "New ToDo created successfully",
            todoUid: todo.id
        })
    } catch (err) {
        console.log(err)
    }

    return NextResponse.json({
        type: "failed",
        message: "New ToDo creation failed"
    })
}

import { TodoType } from "@/configs/datatypes";
const todoJsonFilePath = "src/app/utils/todo.json"


import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const request = await req.json()
    try {
        const todo: TodoType = request.todo
        todo.id = "id" + Math.random().toString(16).slice(2)
    } catch (err) {
        console.log(err)
    }

    return NextResponse.json({
        type: "failed",
        message: "New ToDo creation failed"
    })
}

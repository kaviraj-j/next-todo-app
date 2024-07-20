import { TodoType } from "@/configs/datatypes";
import { readFile } from "fs/promises";
const todoJsonFilePath = "src/app/utils/todo.json"


import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    console.log("Inside the get handleer")
    try {
        const todoJsonFile: any = await readFile(todoJsonFilePath)
        const todoData: Array<TodoType> = await JSON.parse(todoJsonFile) ?? []
        return NextResponse.json({
            type: "success",
            data: todoData
        })


    } catch (err) {
        console.log(err)
    }

}
import { TodoType } from "@/configs/datatypes";
export const getTodos = () => {
    const todoIdsString = localStorage.getItem("todoIds")
    let todoIds: Array<string> = []
    if(todoIdsString) {
        try {
            todoIds = JSON.parse(todoIdsString)
        } catch (e) {
            console.log(e)
        }
    }
    const todos: Array<TodoType> = []
    todoIds.forEach((todoId: string) => {
        const todo: TodoType = JSON.parse(localStorage.getItem(todoId) || "")
        if(todo?.isDeleted) {
            return
        }
        todos.push(todo)
    })
    return todos
}

export const addTodo = (todo: TodoType) => {
    console.log("Inside Localstorage add todo call")
    todo.id = "id" + Math.random().toString(16).slice(2)
    const todoIdsString = localStorage.getItem("todoIds")
    let todoIds: Array<string> = []
    if(todoIdsString) {
        try {
            todoIds = JSON.parse(todoIdsString)
        } catch (e) {
            console.log(e)
        }
    }
    todoIds.push(todo.id)
    localStorage.setItem("todoIds", JSON.stringify(todoIds))
    localStorage.setItem(todo.id, JSON.stringify(todo))
}

export const deleteTodo = (todoId: string) => {
    console.log("Delete from loc stor called")
    const todoString = localStorage.getItem(todoId)
    if(todoString) {
        try{
            const todo: TodoType = JSON.parse(todoString)
            todo.isDeleted = true
            localStorage.setItem(todoId, JSON.stringify(todo))
            console.log("is deleted")
        } catch(e) {
            console.log(e)
        }
    }
}

export const editTodo = (todo: TodoType) => {
    console.log("Edit from loc stor called")
    
    if(todo?.id) {
        const todoString = localStorage.getItem(todo?.id)
        try{
            const foundTodo: TodoType = JSON.parse(todoString ?? "")
            foundTodo.completed = todo?.completed
            localStorage.setItem(todo?.id, JSON.stringify(foundTodo))
            console.log("is deleted")
        } catch(e) {
            console.log(e)
        }
    }
}
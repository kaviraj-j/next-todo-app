"use client";

// Auth
import { getUserId } from "./auth";

// Datatypes
import { TodoType } from "@/configs/datatypes";

// Components
import Todo from './components/Todo';
import AddTodo from './components/AddTodo';
import Loading from './components/Loading';

// Client Hooks
import { useState, useEffect, useRef } from 'react';

// Functions
import { getTodos } from './utils/localStorage';
 
export default function Home() {

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [session, setSession] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const newTodoInputRef = useRef<HTMLInputElement>(null)

  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
      getUserId().then(res => {
        if(res) {
          console.log(res)
          setUserId(res)
        }
      })
      .catch((e) => {
        console.log(e)
      })   
    
  }, [])

  const getTodosFromServer = async () => {
    try {
      const response = await fetch('/api/todo/get', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      return data.data ?? []; // Adjust this line based on the actual structure of your response
    } catch (error) {
      console.error("Error getting todos", error);
      return [];
    }
  };

  const getTodosFromLocalStorage = () => {
    const todos: Array<TodoType> = getTodos();
    return todos || [];
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      if (session) {
        // const user = await currentUser()
        // console.log(user)
        const todosFromServer = await getTodosFromServer();
        setTodos(todosFromServer || []);
      } else {
        const todosFromLocalStorage = getTodosFromLocalStorage();
        setTodos(todosFromLocalStorage || []);
      }
      setIsLoading(false);
    };

    fetchTodos();
  }, [session]);

  return (
    <main className="">
      <div className='m-4 p-4'>
        <AddTodo setTodos={setTodos} session={session} newTodoInputRef={newTodoInputRef} />
      </div>
      <div className="grid p-4 m-4 grid-cols-1 md:grid-cols-2">
        {isLoading ? (
          <Loading />
        ) : !todos.length ? (
          <div className='p-5 m-4 items-center bg-blue-300 rounded-lg'>No Todos right now... <a className='font-bold' onClick={() => newTodoInputRef?.current?.focus()}>Add one</a></div>
        ) : (
          todos.map((todo: TodoType) => (
            <Todo key={todo.id} todo={todo} session={session} todos={todos} setTodos={setTodos} />
          ))
        )}
      </div>
    </main>
  );
}

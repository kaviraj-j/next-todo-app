"use client";
import Todo from './components/Todo';
import { TodoType } from "@/configs/datatypes";
import AddTodo from './components/AddTodo';
import { useState, useEffect, useRef } from 'react';
import { getTodos } from './utils/localStorage';
import Loading from './components/loading';

export default function Home() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [session, setSession] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const newTodoInputRef = useRef<HTMLInputElement>(null)

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
      <div className="grid grid-cols-2 p-4 m-4 sm:grid-cols-1 md:grid-cols-2">
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

"use client";

import { TodoType } from '@/configs/datatypes';
import { LegacyRef, useRef, useState, RefObject } from 'react';
import { addTodo } from '../utils/localStorage';

interface AddTodoProps {
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  session: boolean;
  newTodoInputRef: RefObject<HTMLInputElement>;

}

const AddTodo: React.FC<AddTodoProps> = ({ setTodos, session, newTodoInputRef }) => {
    const [newTodo, setNewTodo] = useState<string>("");
    // const newTodoInputRef = useRef<HTMLInputElement>(null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setNewTodo(value);
    };

    const addTodoToServer = async (todo: TodoType) => {
        try {
            const response = await fetch('/api/todo/new', {
                method: "POST",
                body: JSON.stringify({ todo }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error("Failed to add todo");
            }

            const data = await response.json();
            // Assuming the server returns the updated todos list or the new todo
            setTodos((prevTodos) => [...prevTodos, data.todo]);
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    }

    const addTodoToLocalStorage = (todo: TodoType) => {
        addTodo(todo);
        setTodos((prevTodos) => [...prevTodos, todo]);
    }

    const addTodoHandle = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const todo: TodoType = {
            id: undefined,
            title: newTodo,
            completed: false,
            isDeleted: false
        };
        setNewTodo("");
        if (session) {
            addTodoToServer(todo);
        } else {
            addTodoToLocalStorage(todo);
        }
    };

    return (
        <div>
            <form onSubmit={addTodoHandle}>
                <div className='flex flex-row m-3'>
                <input 
                    className='shadow appearance-none border rounded w-full m-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    type="text" 
                    placeholder='Buy Eggs...' 
                    value={newTodo} 
                    onChange={handleChange}
                    ref={newTodoInputRef}
                />
                <button 
                    className='bg-blue-500 text-white px-2 py-0.5 m-3 rounded hover:bg-blue-600 ml-6 font-bold' 
                    type="submit" 
                    disabled={!newTodo}
                >
                    <span className="">+</span> Add Todo
                </button>
                </div>
            </form>
        </div>
    );
}

export default AddTodo;

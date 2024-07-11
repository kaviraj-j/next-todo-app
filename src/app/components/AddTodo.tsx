"use client";

import { TodoType } from '@/configs/datatypes';
import { useState } from 'react';

const AddTodo = () => {
    const [newTodo, setNewTodo] = useState<string>("");

    const handleChange = (event: any) => {
        const value = event.target.value;
        setNewTodo(value);
    };

    const addTodo = () => {
        
        const todo: TodoType = {
            title: newTodo,
            completed: false,
        };
        setNewTodo("");
        fetch('/api/todo/new', {
            method: "POST",
            body: JSON.stringify({
                todo
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            // Clear the input field after adding the todo
            
        }).catch(error => {
            console.error("Error adding todo:", error);
        });
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder='Buy Eggs...' 
                value={newTodo} 
                onChange={handleChange} 
            />
            <button 
                className='button button-primary' 
                type="button" 
                onClick={addTodo} 
                disabled={!newTodo}
            >
                + add Todo
            </button>
        </div>
    );
}

export default AddTodo;

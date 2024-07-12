// ./components/Todo.tsx
"use client";
import React, { useState } from 'react';
import { TodoType } from '@/configs/datatypes';
import clsx from 'clsx';

interface TodoProps {
  todo: TodoType;
}

const TodoComponent: React.FC<TodoProps> = ({ todo }) => {
  const [todoState, setTodoState] = useState<TodoType>(todo)
  const [isCompleted, setIsCompleted] = useState<boolean>(todo.completed)
  const clickHandler = (event: any) => {
    const todoData = JSON.parse(JSON.stringify({
      ...todoState, 
      completed: !todoState.completed
    }))
    setIsCompleted(!isCompleted)
    fetch("/api/todo/edit", {
      method: "PUT",
      body: JSON.stringify({
        todo: todoData
      })
    })
    
  }
  return (
    <div className="flex flex-row p-4 m-4 items-center">
      
      <input onChange={clickHandler} checked={isCompleted} type="checkbox" value="" className="m-2 w-4 h-4 text-blue-600 bg-gray-1000 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      <div className=''>
        <h2 className={clsx('',{
          "line-through": todo.completed
        })}>{todo.title}</h2>
      </div>
    </div>

  );
};

export default TodoComponent;
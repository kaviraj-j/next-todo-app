"use client";
import React, { useState } from 'react';
import { TodoType } from '@/configs/datatypes';
import clsx from 'clsx';
import TrashIcon from "@/../public/trash-icon.svg";
import Image from 'next/image';
import { deleteTodo, editTodo } from '../utils/localStorage';

interface TodoProps {
  todo: TodoType;
  session: boolean;
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
}

const TodoComponent: React.FC<TodoProps> = ({ todo, session, todos, setTodos }) => {
  const [todoState, setTodoState] = useState<TodoType>(todo);
  const [isCompleted, setIsCompleted] = useState<boolean>(todo.completed);

  const clickHandler = (event: any) => {
    const todoData = JSON.parse(JSON.stringify({
      ...todoState, 
      completed: !todoState.completed
    }));
    setIsCompleted(!isCompleted);
    if(session) {
      editTodoFromServer(todoData)
    } else {
      editTodoFromLocalStorage(todoData)
    }
  };


  const editTodoFromServer = (todoData: TodoType) => {
    
    fetch("/api/todo/edit", {
      method: "PUT",
      body: JSON.stringify({
        todo: todoData
      })
    });
  }

  const editTodoFromLocalStorage = (todo: TodoType) => {
    editTodo(todo)
  }

  const deleteTodoFromServer = () => {
    fetch("/api/todo/delete", {
      method: "DELETE",
      body: JSON.stringify({
        todoId: todo.id
      })
    });
  };

  const deleteTodoFromLocalStorage = () => {
    if(todo?.id) {
      deleteTodo(todo.id);
    }
  };



  const handleDelete = () => {
    if(session) {
      deleteTodoFromServer();
    } else {
      deleteTodoFromLocalStorage();
    }
    setTodos(todos.filter(t => t.id !== todo.id));
  };

  return (
    <div className={clsx("flex flex-row p-4 m-4 items-center bg-blue-300 rounded-lg hover:bg-blue-500", 
      {
        "bg-gray-300 hover:bg-gray-400": isCompleted
      }
    )}>
      <input onChange={clickHandler} checked={isCompleted} type="checkbox" value="" className="m-2 w-4 h-4 text-blue-600 bg-gray-1000 border-gray-300 rounde dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" />
      <h2 className={clsx('', {
        "line-through": isCompleted
      })}>{todo.title}</h2>
      <button onClick={handleDelete} className='ml-3'><Image src={TrashIcon} alt='trash-icon' /></button>
    </div>
  );
};

export default TodoComponent;

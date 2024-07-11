// ./components/Todo.tsx
import React from 'react';
import { TodoType } from '@/configs/datatypes';

interface TodoProps {
  todo: TodoType;
}

const TodoComponent: React.FC<TodoProps> = ({ todo }) => {
  return (
    <div className="flex flex-col p-4 m-4">
      <div className=''>
        <h2>{todo.title}</h2>
        <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
      </div>
    </div>

  );
};

export default TodoComponent;
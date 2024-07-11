import todos from '@/app/utils/todo.json'
import Todo from './components/Todo';
import { TodoType } from "@/configs/datatypes";
import AddTodo from './components/AddTodo';


export default function Home() {
  console.log(todos)

  return (
    <main className="">
        <div className='m-4 p-4'>
          <AddTodo />
        </div>
        <div className="flex flex-col p-4 m-4">
        {!todos?.length ?
          <div>Currenty there are no todos</div> :
          todos.map((todo: TodoType) => {
            return <Todo key={todo.id} todo={todo} />
          })
        }
        </div>
        
    </main>
  );
}

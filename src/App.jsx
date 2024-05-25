import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  }

  const handleCheckbox = (id) => {
    const updatedTodos = todos.map((props) => {
      if (props.id === id) {
        return { ...props, isCompleted: !props.isCompleted };
      }
      return props;
    });
    settodos(updatedTodos);
  }

  const handleEdit = (id) => {
    const editTodo = todos.find((props) => props.id === id)
    if (editTodo) {
      settodo(editTodo.todo);

    }
    handleDelete(id);
  }
  const handleDelete = (id) => {
    const delTodos = todos.filter((props) => {
      return props.id !== id
    })
    settodos(delTodos);
  }

  return (
    <>
      <div className="heading bg-zinc-700 text-white">
        <h1 className="text-2xl text-center p-5">TodoList App</h1>
      </div>
      <div className="container mt-5 mx-auto bg-zinc-500 w-3/4 min-h-[80vh] rounded-md">
        <h2 className="p-3 px-5 font-bold text-lg">Add a Task</h2>
        <div className="data1 p-3 flex gap-5">
          <input onChange={handleChange} value={todo} className="text-center rounded-full w-1/2" type="text" placeholder="Enter your Task" />
          <button onClick={handleAdd} disabled={todo.length <= 1} className="rounded-full bg-slate-300 px-4 font-bold">Save</button>
        </div>
        <div className="data2">
          <h1 className="font-bold text-lg p-3 px-5">My Tasks</h1>
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map((props) => (
            <div key={props.id} className="flex p-3 px-5 gap-5 sm:py-5" >
              <input onChange={() => handleCheckbox(props.id)} className="cursor-pointer" type="checkbox" checked={props.isCompleted} name={props.id} />
              <div className="flex flex-row justify-between gap-10 items-center w-3/4">
                <p className={`w-3/4 ${props.isCompleted ? "line-through" : ""}`}>{props.todo}</p>
                <div className="flex gap-2 m-auto w-1/2 h-full">
                  <button onClick={() => handleEdit(props.id)} className="rounded-full bg-slate-300 px-4 font-bold"><FaEdit /></button>
                  <button onClick={() => handleDelete(props.id)} className="rounded-full bg-slate-300 px-4 font-bold"><MdDelete /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App;

import React, {useState} from 'react'
import './App.css';

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.length === 0) {
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false
    }

    setTodos([...todos, todoItem])
    setNewTodo("")
  }
  const handleDelete = (delIdx) => {
    const filteredTodos =todos.filter((todo, i) => {
      return i !== delIdx;
    })
    setTodos(filteredTodos)
  }
  const handleComplete = (idx) => {
    const updatedTodos = todos.map((todo,i) => {
      if (idx === i) {
        todo.complete = !todo.complete;
      }
      return todo;
    })
    setTodos(updatedTodos)
  }

  return (
    <div >
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" name="newTodo" value={newTodo} 
        onChange={e=>setNewTodo(e.target.value)}/>
        <button type="submit" style={{marginLeft: "10px"}}>Add</button>
      </form>

      {
        todos.map((todo, i) => {
          const todoClasses = [];

          if(todo.complete) {
            todoClasses.push("strikethrough");
          }
          return( 
          <div key={i} >
            <span className={todoClasses.join(" ")} > {todo.text}</span>
            <input onChange={(e)=>{handleComplete(i)}} checked={todo.complete} type="checkbox" />
            <button onClick={(e) =>handleDelete(i)} style={{marginLeft: "10px"}}>Delete</button>
          </div>
          )
        })
      }
    </div>
  );
}

export default App;

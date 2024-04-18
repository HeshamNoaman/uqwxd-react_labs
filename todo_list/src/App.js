import React, { useState, useEffect } from "react";
import "./App.css";


const App = () => {
  const [todos, setTodos] = useState([]);

  const [todoEditing, setTodoEditing] = useState(null);

  // to save todo to dataStorage
  useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);

    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, []);

  useEffect(() => {

    if (todos.length > 0) {
      const json = JSON.stringify(todos);
      localStorage.setItem("todos", json);

    }
  }, [todos]);

  function handleSubmit(event) {
    event.preventDefault();

    const todoAdd = document.getElementById("todoAdd");

    let todo = todoAdd.value.trim();

    if (todo.length > 0) {

      // create a new todos
      const newTodo = {
        id: new Date().getTime(),
        text: todo,
        completed: false

      };

      // to clone the old todos and add newTodo to it
      setTodos([...todos].concat(newTodo));
    }
    else {
      alert("Enter Valid Task");
    }

    // clear the input
    todoAdd.value = "";
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo => todo.id !== id));
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {

    let updatedTodos = [...todos].map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(newTodo) {

    const updatedTodos = [...todos].map(todo => {
      if (todo.id === newTodo.id) {
        todo.text = document.getElementById(newTodo.id).value;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);

  }


  return (
    <div id="todo-list" className="App">
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" align="right" id='todoAdd' />
        <button type="submit">Add Todo</button>
      </form>

      {todos.map(todo =>

        <div key={todo.id} className="todo">
          <div className="todo-text">
            {/* Add checkbox for toggle complete */}
            <input type="checkbox" id="completed" checked={todo.completed} onChange={() => toggleComplete(todo.id)} />

            {/* if it is edit mode, display input box, else display text */}
            {
              todo.id === todoEditing ?
                (<input type="text" id={todo.id} defaultValue={todo.text} />)
                :
                (<div>{todo.text}</div>)
            }
          </div>

          <div className="todo-actions">
            {/* if it is edit mode, allow submit edit, else allow edit */}
            {
              todo.id === todoEditing ?
                (<button onClick={() => submitEdits(todo)}>Submit Edits</button>)
                :
                (<button onClick={() => setTodoEditing(todo.id)}>Edit</button>)
            }

            {/* insert delete button below this line */}
            <button type="button" onClick={() => deleteTodo(todo.id)}>delete</button>

          </div>
        </div>
      )}
    </div>
  );
};
export default App;

import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [projectTitle, setProjectTitle] = useState('Project Title');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newTodoDate, setNewTodoDate] = useState('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = {
        id: todos.length + 1,
        description: newTodo,
        date: newTodoDate,
        completed: false,
      };
      setTodos([...todos, newTodoItem]);
      setNewTodo('');
      setNewTodoDate('');
    }
  };

  const updateTodo = (id, updatedTodo) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(updatedTodos);
  };

  const removeTodo = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleTodoCompletion = id => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const exportAsGist = () => {

    console.log('Exporting summary as a secret gist...');
    const completedTodosCount = todos.filter(todo => todo.completed).length;
    const totalTodosCount = todos.length;
    const summary = `${completedTodosCount} / ${totalTodosCount} completed.`;
    console.log('Summary:', summary);
  };

  const pendingTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (

    <div className="App">
      <h1 className='s1'>
        <input
          type="text"
          value={projectTitle}
          onChange={e => setProjectTitle(e.target.value)}
          className="project-title" />

      </h1>
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          placeholder="Description"
          
          className="new-todo-input"
        />
        <input
          type="date"
          value={newTodoDate}
          onChange={e => setNewTodoDate(e.target.value)}
          className="new-todo-date"
        />
        <button onClick={addTodo} id='sw' className="add-todo-button btn btn-success">Add Todo</button>
      </div>
      <button onClick={exportAsGist} className="export-button">Export Summary as Secret Gist</button>
      <div className="summary">
        <h4 >Summary: {completedTodos.length} / {todos.length} completed.</h4>
      </div>
      <div className="todo-list">
        <div className="pending-todos">
          <button id='s3' className=' form-control btn btn-warning'>Pending Todos</button>
          <ul>
            {pendingTodos.map(todo => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodoCompletion(todo.id)}
                />
                <span>{todo.description}</span>
                <span id='sd'>{todo.date}</span>
                <button onClick={() => removeTodo(todo.id)} className='btn btn-danger'>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="completed-todos">
          <button className='form-control btn btn-success' id='ss'>Completed Todos</button>
          <ul>
            {completedTodos.map(todo => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodoCompletion(todo.id)}
                />
                <span>{todo.description}</span>

                <span id='sd'>{todo.date}</span>
                <button onClick={() => removeTodo(todo.id)} className='btn btn-danger'>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;

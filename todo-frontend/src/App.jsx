import React, { useState, useEffect } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from './services/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all tasks (with search filter)
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await getTodos(search);
      setTodos(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [search]);

  // Handle adding a new task
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await createTodo({ title, description });
      setTitle('');
      setDescription('');
      fetchTodos();
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  // Handle marking task as complete/pending
  const handleToggleComplete = async (todo) => {
    try {
      await updateTodo(todo._id, { completed: !todo.completed });
      fetchTodos();
    } catch (err) {
      setError('Failed to update task status.');
    }
  };

  // Handle deleting a task
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>To-Do List App (MERN Stack)</h2>

      {/* Error Message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '15px', boxSizing: 'border-box' }}
      />

      {/* Add Task Form */}
      <form onSubmit={handleAddTodo} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Task Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '10px' }}
          required
        />
        <input
          type="text"
          placeholder="Task Description (Optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px', background: '#007BFF', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
          Add Task
        </button>
      </form>

      {/* Task List */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            todos.map((todo) => (
              <li 
                key={todo._id} 
                style={{ 
                  background: '#f9f9f9', 
                  padding: '12px', 
                  marginBottom: '10px', 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  borderLeft: todo.completed ? '5px solid #28a745' : '5px solid #ffc107',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <div>
                  <h3 style={{ margin: '0 0 5px 0', textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#888' : '#000' }}>
                    {todo.title}
                  </h3>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>{todo.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleToggleComplete(todo)} 
                    style={{ padding: '6px 10px', cursor: 'pointer', background: todo.completed ? '#6c757d' : '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}
                  >
                    {todo.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button 
                    onClick={() => handleDelete(todo._id)} 
                    style={{ padding: '6px 10px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
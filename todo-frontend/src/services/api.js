import axios from 'axios';

// Backend API URL
const API_URL = 'https://apka-live-backend-url.onrender.com/api/todos';

// Get all todos (with optional search query)
export const getTodos = async (search = '') => {
    try {
        const response = await axios.get(`${API_URL}?search=${search}`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        throw error;
    }
};

// Create a new todo
export const createTodo = async (todoData) => {
    try {
        const response = await axios.post(API_URL, todoData);
        return response.data.data;
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
};

// Update todo (status or details)
export const updateTodo = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data.data;
    } catch (error) {
        console.error('Error updating todo:', error);
        throw error;
    }
};

// Delete todo
export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting todo:', error);
        throw error;
    }
};
const Todo = require('../models/Todo');

// 1. Get all tasks (with search functionality)
exports.getTodos = async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            query.title = { $regex: search, $options: 'insensitive' };
        }
        const todos = await Todo.find(query);
        res.status(200).json({ success: true, data: todos });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 2. Create a new task
exports.createTodo = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title) {
            return res.status(400).json({ success: false, message: 'Title is required' });
        }
        const newTodo = await Todo.create({ title, description });
        res.status(201).json({ success: true, data: newTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Update task details or status
exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!updatedTodo) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, data: updatedTodo });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Delete a task
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ success: false, message: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
<template>
  <div class="container">
    <h1>Task Tracker</h1>

    <!-- New Task Form -->
    <form @submit.prevent="addTask" class="task-form">
      <input
        v-model="newTask"
        type="text"
        placeholder="Add a new task..."
        required
      />
      <button type="submit">Add</button>
    </form>

    <!-- Filter Buttons -->
    <div class="filters">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">
        All
      </button>
      <button
        @click="filter = 'completed'"
        :class="{ active: filter === 'completed' }"
      >
        Completed
      </button>
      <button
        @click="filter = 'incomplete'"
        :class="{ active: filter === 'incomplete' }"
      >
        Incomplete
      </button>
    </div>

    <!-- Task List -->
    <ul class="task-list">
      <li
        v-for="task in filteredTasks"
        :key="task._id"
        :class="{ done: task.completed }"
      >
        <label>
          <input
            type="checkbox"
            v-model="task.completed"
            @change="updateTask(task)"
          />
          {{ task.title }}
        </label>
        <button @click="deleteTask(task._id)" class="delete-btn"></button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomeView',
  data() {
    return {
      newTask: '',
      tasks: [],
      filter: 'all',
    };
  },
  computed: {
    filteredTasks() {
      if (this.filter === 'completed') {
        return this.tasks.filter(task => task.completed);
      } else if (this.filter === 'incomplete') {
        return this.tasks.filter(task => !task.completed);
      }
      return this.tasks;
    },
  },
  methods: {
    async fetchTasks() {
      const res = await axios.get('http://localhost:5000/api/tasks');
      this.tasks = res.data;
    },
    async addTask() {
      const res = await axios.post('http://localhost:5000/api/tasks', {
        title: this.newTask,
        completed: false,
      });
      this.tasks.push(res.data);
      this.newTask = '';
    },
    async updateTask(task) {
      await axios.put(`http://localhost:5000/api/tasks/${task._id}`, task);
    },
    async deleteTask(id) {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      this.tasks = this.tasks.filter(task => task._id !== id);
    },
  },
  mounted() {
    this.fetchTasks();
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #fefefe;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
}

.task-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.task-form input {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.task-form button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

.task-form button:hover {
  background-color: #369a70;
}

.filters {
  text-align: center;
  margin-bottom: 1rem;
}

.filters button {
  background-color: #eee;
  border: none;
  padding: 0.5rem 1rem;
  margin: 0 0.25rem;
  border-radius: 4px;
  cursor: pointer;
}

.filters button.active {
  background-color: #42b983;
  color: white;
  font-weight: bold;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  background-color: #fafafa;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

.task-list li:hover {
  background-color: #f0f0f0;
}

.task-list label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.done span,
.done {
  text-decoration: line-through;
  color: #888;
}

.delete-btn {
  background: none;
  border: none;
  color: #d11a2a;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.1s;
}

.delete-btn:hover {
  transform: scale(1.2);
}
</style>

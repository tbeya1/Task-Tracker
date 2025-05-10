<template>
  <div class="container">
    <h1>Task Tracker</h1>

    <!-- New Task Form -->
    <form @submit.prevent="addTask">
      <input v-model="newTask" placeholder="Add a new task..." required />
      <button type="submit">Add</button>
    </form>

    <!-- Filter Buttons -->
    <div class="filters">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">All</button>
      <button @click="filter = 'completed'" :class="{ active: filter === 'completed' }">Completed</button>
      <button @click="filter = 'incomplete'" :class="{ active: filter === 'incomplete' }">Incomplete</button>
    </div>

    <!-- Task List -->
    <ul>
      <li v-for="task in filteredTasks" :key="task._id">
        <label>
          <input type="checkbox" v-model="task.completed" @change="updateTask(task)" />
          <span :class="{ done: task.completed }">{{ task.title }}</span>
        </label>
        <button @click="deleteTask(task._id)">🗑️</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
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
      //const res = await axios.get('/api/tasks');
      const res = await axios.get('http://localhost:5000/api/tasks');

      this.tasks = res.data;
    },
    async addTask() {
      const res = await axios.post('/api/tasks', {
        title: this.newTask,
        completed: false,
      });
      this.tasks.push(res.data);
      this.newTask = '';
    },
    async updateTask(task) {
      await axios.put(`/api/tasks/${task._id}`, task);
    },
    async deleteTask(id) {
      await axios.delete(`/api/tasks/${id}`);
      this.tasks = this.tasks.filter(task => task._id !== id);
    },
  },
mounted() {
  console.log('Vue component mounted!');
  this.fetchTasks();
}
,
};
</script>

<style>
.container {
  max-width: 600px;
  margin: 2rem auto;
  font-family: Arial, sans-serif;
}

input[type='text'] {
  padding: 0.5rem;
  width: 70%;
}

button {
  margin-left: 0.5rem;
  padding: 0.5rem;
}

.done {
  text-decoration: line-through;
  color: gray;
}

.filters {
  margin: 1rem 0;
}

.filters button {
  margin-right: 0.5rem;
}

.filters button.active {
  font-weight: bold;
  background-color: #ddd;
}
</style>

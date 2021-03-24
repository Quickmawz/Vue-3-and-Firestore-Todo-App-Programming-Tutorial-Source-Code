<template>
<div class="newTaskForm">
  <h1>Create New Task</h1>
  <form @submit.prevent="createNewTask">
    <div class="form-group">
      <label for="newTaskDescription">Task Description</label>
      <input class='form-control' type="text" v-model='newTask.description' placeholder="Add new task description here" required>
    </div>
    <button type='submit' class='btn btn-success'>Create</button>
  </form>
</div>
</template>

<script>
import { reactive } from 'vue';
import { db } from '../firebase';

export default {
  setup() {
    const newTask = reactive({ creationTime: null, description: '', completed: false });
    const tasksCollection = db.collection('tasks');

    const createNewTask = () => {
      tasksCollection.add({ ...newTask, creationTime: Date.now() });
      newTask.description = '';
    }

    return {
      newTask,
      createNewTask
    }
  }
}
</script>

<style>

</style>
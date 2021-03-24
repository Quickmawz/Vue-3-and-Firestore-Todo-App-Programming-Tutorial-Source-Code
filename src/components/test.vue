<template>
<div class="newTaskForm">
  <h1>Create New Task</h1>
  <form @submit.prevent="createNewTask">
    <div class="form-group">
      <label for="newTaskDescription">Task Description</label>
      <input class='form-control' type="text" v-model='newTask.taskDescription' placeholder="Add task description here" required>
    </div>
    <button type='submit' class='btn btn-success'>Create</button>
  </form>
</div>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const newTask = reactive({ taskDescription: 'first written task' });
    console.log({ ...newTask })
    console.log(newTask.taskDescription);

    const createNewTask = ({ ...newTask }) => {
      console.log({ ...newTask })
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
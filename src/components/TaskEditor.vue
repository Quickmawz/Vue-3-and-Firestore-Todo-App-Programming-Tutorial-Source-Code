<template>
<div class="newTaskForm">
  <router-link :to="'/'" class='btn btn-primary'>Back</router-link>
  <h1>Task Editor</h1>
  <form @submit.prevent="updateTask">
    <div class="form-group">
      <label for='taskDescription'>Task Description</label>
      <input id='taskDescription' class='form-control' type="text" v-model="taskDescription" placeholder="Add new task description here" required>
      <!-- <h2>Task Description: {{ taskDescription }}</h2> -->
    </div>
    <div class="form-group form-check">
      <input type="checkbox" v-model="taskCompleted" id='taskCompletionStatus' class='form-check-input' value='completed' />
      <label for='taskCompletionStatus' class='form-check-label'>Completed</label>
    </div>
    <div class="form-group">
      <label for="">Task Creation Date: {{ taskCreationDateAndTimeOfDay }}</label>
    </div>
    <button type='submit' class='btn btn-success'>Update</button>
  </form>
</div>
</template>

<script>
import { ref, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import router from '../router'

export default {
  setup() {
    const tasksCollection = db.collection('tasks');
    const route = useRoute()
    const taskID = route.query.taskID
    const taskDescription = ref('')
    const taskCompleted = ref(null)
    const taskCreationDateAndTimeOfDay = ref(0)

    const getTask = tasksCollection.doc(taskID).get().then((doc) => {
      if (doc.exists) {
        console.log(doc.data())

        taskDescription.value = doc.data().description
        taskCompleted.value = doc.data().completed
        taskCreationDateAndTimeOfDay.value = new Date(doc.data().creationTime).toLocaleTimeString("en-US", {month:'long', year:'numeric', day:'numeric'})
      } else {
        console.log('No such document found')
      }
    }).catch((error) => {
      console.log("Error getting document:", error)
    })

    onUnmounted(getTask);

    const updateTask = () => {
      tasksCollection.doc(taskID).get().then((doc) => {
        if (doc.exists) {
          console.log(taskCompleted.value)

          doc.ref.update({
            description: taskDescription.value,
            completed: taskCompleted.value,
          }).then(() => {
            console.log('Task successfully updated!')
            router.push('/')
          }).catch(error => {
            console.log('Error updated task:', error)
          })
        } else {
          console.log('No such document!')
        }
      }).catch(error => {
        console.log('Error getting document: ', error)
      })
    }

    return {
      updateTask,
      taskDescription,
      taskCompleted,
      taskCreationDateAndTimeOfDay,
    }
  }
}
</script>

<style>

</style>
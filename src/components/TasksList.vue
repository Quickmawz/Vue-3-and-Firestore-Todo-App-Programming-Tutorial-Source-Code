<template>
<div class='tasksList'>
  <h2>Unodered list of tasks goes here</h2>
  
  <table class='table'>
    <thead class='thead-dark'>
      <tr>
        <th class='description'>Description</th>
        <th class='edit'>Edit</th>
        <th class='delete'>Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="{ id, description, completed } in tasks" :key="id">
        <td class='description' @click='updateTaskCompletion(id)' v-bind:class="{ completed: completed }">{{ description }}</td>
        <!-- <td><button class='btn btn-primary' @click='setTaskUpForEdit(id)'>Edit</button></td> -->
        <td>
          <!-- <a href="./editTask/" class='btn btn-primary'>Edit</a> -->
          <!-- <router-link :to="'/editTask'" class='btn btn-primary'>Edit</router-link> -->
          <router-link :to="'/editTask?taskID=' + id" class='btn btn-primary'>Edit</router-link>
          <!-- <button class='btn btn-primary'>Edit</button> -->
        </td>
        <td><button class='btn btn-danger' @click='deleteTask(id)'>Delete</button></td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
import { ref, onUnmounted } from 'vue';
import { db } from '../firebase';

export default {
  setup() {
    const tasksCollection = db.collection('tasks');
    const tasks = ref([]);

    const getTasks = tasksCollection.orderBy('creationTime', 'asc').onSnapshot(snapshot => {
      // console.log('Current data: ' + snapshot.docs);

      tasks.value = snapshot.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }));

      // console.log(tasks.value);
    });
    onUnmounted(getTasks);

    const updateTaskCompletion = (taskID) => {
      // console.log('completed');
      // console.log('task ID: ' + taskID);

      tasksCollection.doc(taskID).get().then((doc) => {
        if (doc.exists) {
          // console.log('document data: ', doc.data());
          // console.log(doc.data().completed);

          doc.ref.update({
            completed: !doc.data().completed,
          }).then(() => {
            // console.log('completion stat update has been successful');
          }).catch(err => {
            console.log('Error updating completition status: ', err);
          });
        } else {
          console.log('no such document!');
        }
      }).catch(err => {
        console.log('Error getting document: ', err);
      });
    }

    // const setTaskUpForEdit = (taskID) => {
    //   console.log(taskID);
    // }

    const deleteTask = (taskID) => {
      tasksCollection.doc(taskID).get().then((doc) => {
        if (doc.exists) {
          doc.ref.delete().then(() => {
            // console.log('Document deleted successfully');
          }).catch(err => {
            console.log('Deletion unsuccessful: ', err);
          });
        } else {
          console.log('no such document!');
        }
      }).catch(err => {
        console.log('Error getting document: ', err);
      });
    }

    return {
      tasks,
      updateTaskCompletion,
      // setTaskUpForEdit,
      deleteTask,
    }
  }
}
</script>

<style>
.tasksList table {
  width: 100%;
  table-layout: auto;
}
.tasksList table th.edit,
.tasksList table th.delete {
  width: 100px;
}
.tasksList tbody td.description {
  cursor: pointer;
}
.completed {
  text-decoration: line-through
}
</style>
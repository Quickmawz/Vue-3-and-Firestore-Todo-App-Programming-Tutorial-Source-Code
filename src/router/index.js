import { createRouter, createWebHistory } from 'vue-router'
import NewTaskFormAndTasksList from '../components/NewTaskFormAndTasksList.vue'
import TaskEditor from '../components/TaskEditor.vue'
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'NewTaskFormAndTasksList',
    component: NewTaskFormAndTasksList
  },
  {
    path: '/editTask',
    name: 'TaskEditor',
    component: TaskEditor
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

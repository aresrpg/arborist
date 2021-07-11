import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Editor from './views/Editor.vue'

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/:url/:tree?',
    component: Editor,
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})

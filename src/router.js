import { createRouter, createWebHistory } from 'vue-router'
import Editor from './views/Editor.vue'

const routes = [
  {
    path: '/',
    redirect: `/${encodeURIComponent('http://localhost:4242/behavior')}`,
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

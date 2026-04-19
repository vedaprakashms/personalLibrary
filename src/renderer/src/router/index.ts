import { createWebHashHistory, createRouter } from 'vue-router'

import HomeView from '../pages/home.vue'
import AddBookView from '../pages/addbook.vue'
import AboutView from '../pages/about.vue'
import updateBook from '../pages/updateBook.vue'
import PrintLabelsView from '../pages/printlabels.vue'
import Listbooks from '@renderer/pages/listbooks.vue'

export const routes = [
  { path: '/', component: HomeView, name: 'Search Book' },
  { path: '/listbooks', component: Listbooks, name: 'List Books' },
  { path: '/addbook', component: AddBookView, name: 'Add Book' },
  { path: '/updatebook', component: updateBook, name: 'Update Book' },
  { path: '/printlabels', component: PrintLabelsView, name: 'Print Labels' },
  { path: '/about', component: AboutView, name: 'About  ' }
]

const router = createRouter({
  // Note: We're using createMemoryHistory() here for compatibility
  //       with the Playground. In a real application you'd usually
  //       use createWebHistory() or createWebHashHistory() instead,
  //       tying the route to the browser URL. See the documentation
  //       for more information about history modes.
  history: createWebHashHistory(),
  routes
})

export default router

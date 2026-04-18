<script setup lang="ts">
import { onMounted, ref } from 'vue'
interface book {
  _id?: string
  Title: string
  Author: string
  Genre: string
  Section: string
  section2: string
  uniqueId?: string
}
const books = ref<book[]>([])
onMounted(() => {
  window.books.getbooksList().then(async (r) => {
    r.map((e) => {
      books.value?.push(e)
      console.log(e)
    })
  })

  console.log(books)
})
</script>
<template>
  <table class="striped">
    <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Author</th>
        <th scope="col">Genre</th>
        <th scope="col">Store Section</th>
        <th scope="col">Store Section II</th>
        <th scope="col">Book ID</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="book1 in books" :key="book1._id">
        <th scope="row">{{ book1.Title }}</th>
        <td>{{ book1.Author }}</td>
        <td>{{ book1.Genre }}</td>
        <td>{{ book1.Section }}</td>
        <td>{{ book1.section2 }}</td>
        <td>{{ book1.uniqueId }}</td>
      </tr>
    </tbody>
  </table>
</template>

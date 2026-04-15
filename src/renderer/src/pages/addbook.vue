<script setup lang="ts">
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
const toast = useToast()
interface book {
  _id?: string
  Title: string
  Author: string
  Genre: string
  Section: string
  section2: string
  uniqueId?: string
}
const bookStore = ref<book>({
  Title: '',
  Author: '',
  Genre: '',
  Section: '',
  section2: '',
  uniqueId: ''
})

const StoreBook = (): void => {
  // Implementation for storing the book
  console.log('Storing book:', bookStore.value)
  window.books
    .addBook(JSON.stringify(bookStore.value))
    .then((r: book | Error) => {
      if (r instanceof Error) {
        console.error('Error storing book:', r)
        toast.error('Error storing book: ' + r.message)
      } else {
        console.log('Book stored successfully')
        toast.success('Book stored successfully with ID: ' + r.uniqueId)
      }
    })
    .catch((error: Error) => {
      console.error('Error storing book:', error)
      toast.error('Error storing book: ' + error.message)
    })
    .finally(() => {
      bookStore.value = {
        Title: '',
        Author: '',
        Genre: '',
        Section: '',
        section2: ''
      }
    })
}
</script>

<template>
  <div>
    <div class="grid">
      <div class="card">
        <h2>Title</h2>
        <input v-model="bookStore.Title" type="text" placeholder="Book Title" />
      </div>
      <div class="card">
        <h2>Author</h2>
        <input v-model="bookStore.Author" type="text" placeholder="Book Author" />
      </div>
      <div class="card">
        <h2>Unique ID</h2>
        <input v-model="bookStore.uniqueId" type="text" placeholder="Unique ID" />
      </div>
    </div>
    <div class="grid">
      <div class="card">
        <h2>Section</h2>
        <input v-model="bookStore.Section" type="text" placeholder="Storage Section" />
      </div>
      <div class="card">
        <h2>Section II</h2>
        <input v-model="bookStore.section2" type="text" placeholder="Storage Section II" />
      </div>
      <div class="card">
        <h2>Genre</h2>
        <select id="genre" v-model="bookStore.Genre" aria-label="Select the genre of the book">
          <option selected disabled value="">Select the genre of the book</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-Fiction</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="fantasy">Fantasy</option>
          <option value="biography">Biography</option>
          <option value="devotional">Devotional</option>
          <option value="history">History</option>
          <option value="mystery">Mystery</option>
          <option value="romance">Romance</option>
        </select>
      </div>
    </div>
    <div class="parent">
      <div class="div1">
        <button class="button" @click="StoreBook" @keydown.enter="StoreBook">Add Book</button>
      </div>
    </div>
  </div>
</template>

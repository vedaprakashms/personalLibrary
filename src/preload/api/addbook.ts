import Datastore from '@seald-io/nedb'

interface book {
  _id?: string
  Title: string
  Author: string
  Genre: string
  Section: string
  section2: string
  uniqueId?: string
}
// Create a database
const db = new Datastore({ filename: './data/books.db', autoload: true })

export const books = {
  addBook: async (book: string): Promise<book | Error> => {
    const bookData = JSON.parse(book)
    console.log(bookData)
    try {
      const docs = await db.findAsync({ uniqueId: bookData.uniqueId })
      if (docs.length > 0) {
        console.error('Book with this unique ID already exists')
        return new Error('Book with this unique ID already exists')
      }
      const result = await db.insertAsync(bookData)
      console.log('Book added successfully')
      return result
    } catch (error) {
      console.error('Error adding book:', error)
      return new Error('Error adding book')
    }
  }
}

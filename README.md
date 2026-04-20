# personallibrary

This library app is for all the bookworm's out there. Maintaining a book collection takes time and effort, but knowing where to put back the book is another story.
This app should help anyone with a decent book collection to organize and keep their books intact.

## Features

1. Scannable code genration using default A4 page constraints, 80 QR codes genrated per page.
2. Assign a single QR code to each book.
3. Add Book to the embedded database.
4. Addbook section to have QR scan using normal embedded camera or webcam.
5. Update book function to help if any changes to be done on a stored book.
6. Update book to have QR scanning as well.
7. Single list of all books stored in the DataBase.
8. Search Function based on all fields \* to be implimented yet

## Future Enhacment

1. Excel based import and export of bookset data
2. regenration of QRcode set

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

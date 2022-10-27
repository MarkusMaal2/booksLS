
// Text inputs
const bookTitle = document.querySelector("#title")
const bookAuthor = document.querySelector("#author")
const bookISBN = document.querySelector("#isbn")

// Book list
const bookList = document.querySelector("#booklist")

// Add book to localStorage
function addBookLS(title, author, isbn) {
    let books
    if (localStorage.getItem("books") === null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem("books"))
    }
    const book = [title, author, isbn]
    books.push(book)
    localStorage.setItem("books", JSON.stringify(books))
}


// Delete book from local storage
function deleteBookFromLocalStorage(title, author, isbn) {
    let books
    if (localStorage.getItem("books") === null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem("books"))
        let deletableBook = [title, author, isbn]
        books.forEach((book, i) => {
            if (book[0] + book[1] + book[2] === deletableBook[0] + deletableBook[1] + deletableBook[2]) {
                books.splice(i, 1)
            }
        })
    }
    localStorage.setItem("books", JSON.stringify(books))
}

// Get books from LS
function getBooksFromLocalStorage() {
    let books
    if (localStorage.getItem("books") === null) {
        books = []
    } else {
        books = JSON.parse(localStorage.getItem("books"))
    }
    books.forEach((book) => {
        addRow(book[0], book[1], book[2])
    })
}

function addRow(bookTitle, bookAuthor, bookISBN) {
    // create book title column
    let colTitle = document.createElement("td")
    colTitle.appendChild(document.createTextNode(bookTitle))

    // create author column
    let colAuthor = document.createElement("td")
    colAuthor.appendChild(document.createTextNode(bookAuthor))

    // create ISBN column
    let colISBN = document.createElement("td")
    colISBN.appendChild(document.createTextNode(bookISBN))

    // add the delete button to the ISBN column
    let xLink = document.createElement("a")
    xLink.href = "#"
    xLink.className = "secondary-content"
    xLink.appendChild(document.createTextNode("X"))
    colISBN.appendChild(xLink)

    // create row
    let newBook = document.createElement("tr")

    // add all columns to the new row
    newBook.appendChild(colTitle)
    newBook.appendChild(colAuthor)
    newBook.appendChild(colISBN)

    // add newly created table row to the book table
    bookList.appendChild(newBook)
}

// Add Book function
function addBook(e) {
    addRow(bookTitle.value, bookAuthor.value, bookISBN.value)
    // add to localStorage
    addBookLS(bookTitle.value, bookAuthor.value, bookISBN.value)
    // clear user input
    bookTitle.value = ""
    bookAuthor.value = ""
    bookISBN.value = ""
    e.preventDefault()
}

function deleteBook(e) {
    if (e.target.textContent === "X") {
        // ask for user confirmation
        if (confirm(`Are you sure you want to delete this book from the list?`)) {
            // get parent of parent element, which is always the row of the table
            let tableRow = e.target.parentElement.parentElement
            let title = tableRow.children[0].textContent
            let author = tableRow.children[1].textContent
            let isbn = tableRow.children[2].textContent
            isbn = isbn.slice(0, isbn.length - 1)
            // delete from localStorage
            deleteBookFromLocalStorage(title, author, isbn)
            // delete row
            tableRow.remove()
        }
    }
    e.preventDefault()
}


// Event listeners
const submit = document.querySelector("#submit")
submit.addEventListener("click", addBook)
bookList.addEventListener("click", deleteBook)
document.addEventListener("DOMContentLoaded", getBooksFromLocalStorage)
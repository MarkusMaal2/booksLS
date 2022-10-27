
// Text inputs
const bookTitle = document.querySelector("#title")
const bookAuthor = document.querySelector("#author")
const bookISBN = document.querySelector("#isbn")

// Add Book function
function addBook(e) {
    // create book title column
    let colTitle = document.createElement("td")
    colTitle.appendChild(document.createTextNode(bookTitle.value))

    // create author column
    let colAuthor = document.createElement("td")
    colAuthor.appendChild(document.createTextNode(bookAuthor.value))

    // create ISBN column
    let colISBN = document.createElement("td")
    colISBN.appendChild(document.createTextNode(bookISBN.value))

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
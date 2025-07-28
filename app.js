
const myLibrary = [];

addBookToLibrary("Jane Austen", "Pride and Prejudice", true);
addBookToLibrary("Fyodor Dostoyevsky", "Cime and Punishment", true);
addBookToLibrary("Leo Tolstoy", "War and Peace", false);
displayBooks();

const newBookForm = document.getElementById("add-book");
const addBookBtn = newBookForm.querySelector("#submitBtn");
const authorInput = newBookForm.querySelector("#book-author");
const titleInput = newBookForm.querySelector("#book-title");
const statusInput = newBookForm.querySelector("#book-status");

newBookForm.addEventListener("close", (e) =>
{
    if(newBookForm.returnValue !== "default" &&
    newBookForm.returnValue !== "cancel" )
    {
        let newBook = addBookToLibrary(
            authorInput.value,
            titleInput.value,
            statusInput.checked && statusInput.value === 'on'
        );

        displayBook(newBook);
    }
});

addBookBtn.addEventListener("click", (event) =>
{
    event.preventDefault();
    newBookForm.close("added");
})

const addNewBtn = document.querySelector("button.new-book");
addNewBtn.addEventListener("click", () =>
{
    displayDialog();
});

function Book(author, title, wasRead)
{
    if(!new.target)
    {
        throw Error("Please use 'new' operator to call the constructor!");
    }

    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.wasRead = wasRead;
}

function addBookToLibrary(author, title, wasRead)
{
    let book = new Book(author, title, wasRead);
    myLibrary.push(book);

    return book;
}

function displayBooks()
{
    myLibrary.forEach(book => {
        displayBook(book);

    });
}

function displayBook(book){

    const template = document.querySelector("#book-card");
    const booksContainer = document.querySelector(".books");

    const card = template.content.cloneNode(true);

    card.querySelector(".card-title").textContent = book.title;
    card.querySelector(".card-subtitle").textContent = book.author;
    card.querySelector(".card-status").checked = book.wasRead;

    booksContainer.appendChild(card);
}

function displayDialog()
{
    newBookForm.showModal();
}
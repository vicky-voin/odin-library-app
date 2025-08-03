class Book
{
    constructor(author, title, wasRead)
    {
        this.id = crypto.randomUUID();
        this.author = author;
        this.title = title;
        this.wasRead = wasRead;
    }

    toggleStatus()
    {
        this.wasRead = !this.wasRead;
    }
}

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

function addBookToLibrary(author, title, wasRead)
{
    let book = new Book(author, title, wasRead);
    myLibrary.push(book);

    return book;
}

function removeFromLibrary(id)
{
    myLibrary.splice(myLibrary.findIndex(x=>x.id == id),1);
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

    const cardFragment = template.content.cloneNode(true);
    const cardElem = cardFragment.querySelector(".card-root"); // Adjust selector to your card root

    cardElem.querySelector(".card-title").textContent = book.title;
    cardElem.querySelector(".card-subtitle").textContent = book.author;
    const checkbox = cardElem.querySelector(".card-status")
    checkbox.checked = book.wasRead;
    checkbox.addEventListener("change", (e) => {
        book.toggleStatus();
    });

    cardElem.querySelector(".card-remove").addEventListener("click", ()=>
    {
        booksContainer.removeChild(cardElem);
        removeFromLibrary(cardElem.dataset.id);
    });

    cardElem.dataset.id = book.id;

    booksContainer.appendChild(cardElem);
}

function displayDialog()
{
    newBookForm.showModal();
}
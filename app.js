
const myLibrary = [];

addBookToLibrary("Jane Austen", "Pride and Prejudice", true);
addBookToLibrary("Fyodor Dostoyevsky", "Cime and Punishment", true);
addBookToLibrary("Leo Tolstoy", "War and Peace", false);
displayBooks();

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
}

function displayBooks()
{
    const template = document.querySelector("#book-card");
    const booksContainer = document.querySelector(".books");

    myLibrary.forEach(book => {
        const card = template.content.cloneNode(true);

        card.querySelector(".card-title").textContent = book.title;
        card.querySelector(".card-subtitle").textContent = book.author;
        card.querySelector(".card-status").checked = book.wasRead;

        booksContainer.appendChild(card);
    });
}
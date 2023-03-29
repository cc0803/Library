
let library = [];

// Select all relevant document elements
const showButton = document.querySelector(".show");
const bookDisplay = document.querySelector(".display");
const addButton = document.querySelector(".add");
const formDiv = document.querySelector(".form");
const overlay = document.querySelector(".overlay");
const submitButton = document.querySelector("[type='submit']");

function BookConstructor(title, author, pages, read) {
    (this.title = title),
        (this.author = author),
        (this.pages = pages),
        (this.read = read);
}

BookConstructor.prototype.info = function () {
    return `${this.title} from ${this.author} has ${this.pages}. ${this.read}`;
};

function addBookToLibrary(title, author, pages, read) {
    library.unshift(new BookConstructor(title, author, pages, read));
    console.log(library);
}

function submitButtonAction() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("[name='read']:checked").value;

    addBookToLibrary(title, author, pages, read);
}

addBookToLibrary("Harry Potter", "J.K. Rowling", 576, "not read");
addBookToLibrary("Tributes of Panem", "Susanne Collins", 532, "not read");
addBookToLibrary("Atomic Habbits", "James Clear", 352, "read");

function displayLibrary() {
    library.forEach((book) => {
        // Create new div.book as a container for the book
        let newElement = document.createElement("div");
        newElement.classList.add("book", "flex-center");
        bookDisplay.appendChild(newElement);

        // Add the heading and description and match them to books in the library
        let heading = document.createElement("h3");
        heading.textContent = book.title;
        newElement.appendChild(heading);

        // Add author, pages and rather I have read it
        let author = document.createElement("p");
        let pages = document.createElement("p");
        let read = document.createElement("p");

        author.classList.add("author");
        pages.classList.add("pages");
        read.classList.add("read");

        author.textContent = book.author;
        pages.textContent = book.pages;
        read.textContent = book.read;

        newElement.appendChild(author);
        newElement.appendChild(pages);
        newElement.appendChild(read);

        bookDisplay.style.backgroundColor = "#555";
    });
}

showButton.addEventListener(
    "click",
    () => {
        displayLibrary();
    },
    { once: true }
);

addButton.addEventListener("click", () => {
    formDiv.classList.add("visible");
    overlay.classList.add("active");
});

overlay.addEventListener("click", () => {
    formDiv.classList.remove("visible");
    overlay.classList.remove("active");
});

submitButton.addEventListener("click", () => {
    submitButtonAction();
})

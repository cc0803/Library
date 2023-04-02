// Select all relevant document elements
const showButton = document.querySelector(".show");
const bookDisplay = document.querySelector(".display");
const addButton = document.querySelector(".add");
const formDiv = document.querySelector(".form");
const overlay = document.querySelector(".overlay");
const submitButton = document.querySelector("[type='submit']");

let library = [];

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
    library.push(new BookConstructor(title, author, pages, read));
}

function submitButtonAction() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("[name='read']:checked").value;

    addBookToLibrary(title, author, pages, read);
}

function resetForm() {
    // Make the form invisible
    formDiv.classList.remove("visible");
    overlay.classList.remove("active");

    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#pages").value = "";
    document.querySelector("#yes").checked = true;
}


function displayLibrary() {
    while (bookDisplay.firstChild) {
        bookDisplay.removeChild(bookDisplay.lastChild);
    }

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
        let remove = document.createElement("button");

        remove.classList.add("remove");
        author.classList.add("author");
        pages.classList.add("pages");
        read.classList.add("read");

        remove.textContent = "remove";
        author.textContent = book.author;
        pages.textContent = book.pages;
        read.textContent = book.read;

        newElement.appendChild(author);
        newElement.appendChild(pages);
        newElement.appendChild(read);
        newElement.appendChild(remove);

        bookDisplay.style.backgroundColor = "#555";
    });
}

showButton.addEventListener(
    "click",
    () => {
        displayLibrary();
    }
);

addButton.addEventListener("click", () => {
    formDiv.classList.add("visible");
    overlay.classList.add("active");
});


submitButton.addEventListener("click", () => {
    submitButtonAction();
    event.preventDefault();
    resetForm();
    displayLibrary();
});

overlay.addEventListener("click", () => {
    formDiv.classList.remove("visible");
    overlay.classList.remove("active");
});

addBookToLibrary("Atomic Habits", "James Clear", 320, "yes");
addBookToLibrary("The 4-Hour Workweek", "Tim Ferris", 416, "yes");

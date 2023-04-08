// Select all relavent document elements
const showButton = document.querySelector(".show");
const bookDisplay = document.querySelector(".display");
const addButton = document.querySelector(".add");
const formDiv = document.querySelector(".form");
const overlay = document.querySelector(".overlay");
const submitButton = document.querySelector("[type='submit']");

let toggleReadButtons = [];
let removeButton = [];
let dataAttributeCount = 0;
let library = [];

function BookConstructor(title, author, pages, read, dataAttribute) {
    (this.title = title),
        (this.author = author),
        (this.pages = pages),
        (this.read = read),
        (this.index = dataAttribute);
}

BookConstructor.prototype.info = function () {
    return `${this.title} from ${this.author} has ${this.pages} pages. Have I you read it? ${this.read}`;
};

function addBookToLibrary(title, author, pages, read, dataAttribute) {
    library.push(
        new BookConstructor(title, author, pages, read, dataAttribute)
    );
}

function submitButtonAction() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("[name='read']:checked").value;

    addBookToLibrary(title, author, pages, read, dataAttributeCount);
    dataAttributeCount += 1;
}

function removeButtonAction(index) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].index == index) {
            library.splice(i, 1);
        }
    }
}

function toggleReadButtonAction(index) {
    for (let i = 0; i < library.length; i++) {
        if (library[i].index == index) {
            if (library[i].read == "no") {
                library[i].read = "yes";
                toggleReadButtons[i].style.backgroundColor = "red";
                toggleReadButtons[i].textContent = "not read";
                changeReadStatusOnBookcard(i + 1, "yes")
            } else {
                library[i].read = "no";
                toggleReadButtons[i].style.backgroundColor = "green";
                toggleReadButtons[i].textContent = "read";
                changeReadStatusOnBookcard(i + 1, "no");
            }
        }
    }
}

function changeReadStatusOnBookcard(index, status) {
    document.querySelector(`.book:nth-child(${index})>p:last-of-type`).textContent = status;
}

function setInitialReadButton(status, button) {
    if (status == "yes") {
        button.style.backgroundColor = "red";
        button.textContent = "not read";
    } else {
        button.style.backgroundColor = "green";
        button.textContent = "read"
    }
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

    library.forEach((book, index) => {
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
        let buttonDiv = document.createElement("div");
        let remove = document.createElement("button");
        let toggleRead = document.createElement("button");

        buttonDiv.classList.add("button-container");
        remove.classList.add("book-button", "remove");
        toggleRead.classList.add("book-button");
        author.classList.add("author");
        pages.classList.add("pages");
        read.classList.add("read");

        remove.textContent = "remove";
        author.textContent = book.author;
        pages.textContent = book.pages;
        read.textContent = book.read;

        remove.setAttribute("data-index", book.index);
        removeButton.push(remove);
        toggleRead.setAttribute("data-index", book.index);
        toggleReadButtons.push(toggleRead);
        setInitialReadButton(book.read, toggleRead);

        buttonDiv.appendChild(remove);
        buttonDiv.appendChild(toggleRead);

        newElement.appendChild(author);
        newElement.appendChild(pages);
        newElement.appendChild(read);
        newElement.appendChild(buttonDiv);

        bookDisplay.style.backgroundColor = "#555";

        toggleRead.addEventListener("click", () => {
            toggleReadButtonAction(toggleRead.getAttribute("data-index"));
        });

        removeButton.forEach((button) => {
            button.addEventListener("click", () => {
                removeButtonAction(button.getAttribute("data-index"));
                displayLibrary();
            });
        });
    });
}

function checkFormInput() {
    const requiredElements = Array.from(
        document.querySelectorAll("input:required")
    );

    if (
        requiredElements[0].value != "" &&
        requiredElements[1].value != "" &&
        requiredElements[2].value != ""
    ) {
        return true;
    } else {
        return false;
    }
}

showButton.addEventListener("click", () => {
    displayLibrary();
});

addButton.addEventListener("click", () => {
    formDiv.classList.add("visible");
    overlay.classList.add("active");
});

submitButton.addEventListener("click", (e) => {
    if (checkFormInput()) {
        submitButtonAction();
        resetForm();
        displayLibrary();
        e.preventDefault();
    }
});

overlay.addEventListener("click", () => {
    formDiv.classList.remove("visible");
    overlay.classList.remove("active");
});

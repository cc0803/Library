let library = [];

// Select all relevant document elements
const showButton = document.querySelector(".show");
const bookDisplay = document.querySelector(".display");

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

function displayLibrary() {
  for (let book of library) {
    console.log(book.info());
  }
}

addBookToLibrary("Harry Potter", "J.K. Rowling", 576, "not read");
addBookToLibrary("Tributes of Panem", "Susanne Collins", 532, "not read");
addBookToLibrary("Atomic Habbits", "James Clear", 352, "read");

displayLibrary();

showButton.addEventListener("click", () => {
  let newElement = document.createElement("div");
  newElement.classList.add("book");
  bookDisplay.appendChild(newElement);
});

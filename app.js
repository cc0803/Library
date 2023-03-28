
let library = [];

// Select all relevant document elements
const showButton = document.querySelector('.show');
const bookDisplay = document.querySelector('.display');

function BookConstructor(title, author, pages, read){
    this.title = title,
    this.author = author,
    this.pages =  pages,
    this.read = read
}

BookConstructor.prototype.info = function() {
    return `${this.title} from ${this.author} has ${this.pages}. ${this.read}`;
}

function addBookToLibrary(title, author, pages, read) {
    library.push(new BookConstructor(title, author, pages, read));
}

function displayLibrary() {
    for (let book of library) {
        console.log(book.info())
    }
}

addBookToLibrary('Harry Potter', 'J.K. Rowling', 576, 'not read');
addBookToLibrary('Tributes of Panem', 'Susanne Collins', 532, 'not read');
addBookToLibrary('Atomic Habbits', 'James Clear', 352, 'read');

displayLibrary();

showButton.addEventListener('click', () => {

    library.forEach(book => {
        // Create new div.book as a container for the book
        let newElement = document.createElement('div');
        newElement.classList.add('book', 'flex-center');
        bookDisplay.appendChild(newElement);

        // Add the heading and description and match them to books in the library
        let heading = document.createElement('h3');
        heading.textContent = book.title;
        newElement.appendChild(heading);

        // Add author, pages and rather I have read it
        let author = document.createElement('p')
        let pages = document.createElement('p')
        let read = document.createElement('p')

        author.classList.add('author');
        pages.classList.add('pages');
        read.classList.add('read');
        
        author.textContent = book.author;
        pages.textContent = book.pages;
        read.textContent = book.read;

        newElement.appendChild(author)
        newElement.appendChild(pages)
        newElement.appendChild(read)
    })
    
})

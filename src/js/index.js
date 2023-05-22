import * as slider from './slider.js';
import * as cart from './shoping_cart.js';
import * as bookCatalog from './book-catalog.js';

const BOOK_CATEGORIES = [
    'subject:Architecture',
    'subject:Art',
    'subject:Biography&Autobiography',
    'subject:Business',
    'subject:Crafts&Hobbies',
    'subject:Drama',
    'subject:Fiction',
    'subject:Cooking',
    'subject:Health&Fitness',
    'subject:History',
    'subject:Humor',
    'subject:Poetry',
    'subject:Psychology',
    'subject:Science',
    'subject:Technology',
    'subject:Travel'
];

let navListItems = document.querySelectorAll(".main-content__navigation-list-item")
let mainContent = document.querySelector(".main-content__book-catalog")

for (let i = 0; i < navListItems.length; i++) {
    navListItems[i].addEventListener('click', addBooksOnPage(BOOK_CATEGORIES[i], i))
}

async function addBooksOnPage(category, catNum) {
    let navActiveItem = document.querySelector(".main-content__navigation-list-item-active")
    navActiveItem.classList.toggle('main-content__navigation-list-item-active')
    navListItems[catNum].classList.toggle('main-content__navigation-list-item-active')

    mainContent.replaceChildren();
    let bookList = await bookCatalog.getBookList(category);
    for (let i = 0; i < 5; i++) {
        bookCatalog.createBook(bookList[i].author, bookList[i].cover, bookList[i].title, bookList[i].rating, bookList[i].reviews, bookList[i].description, bookList[i].price)
    }
    cart.arrangeBuyButtons();
}

addBooksOnPage(BOOK_CATEGORIES[0], 0)



// отображение активной категории
// кнопка  больше книг (поиск по классу)
// книги в локал сторидж


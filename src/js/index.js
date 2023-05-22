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

async function addBooksOnPage(category) {
    let bookList = await bookCatalog.getBookList(category);
    for (let i = 0; i < 5; i++) {
        bookCatalog.createBook(bookList[i].author, bookList[i].cover, bookList[i].title, bookList[i].rating, bookList[i].reviews, bookList[i].description, bookList[i].price)
    }
    cart.arrangeBuyButtons();
}

addBooksOnPage(BOOK_CATEGORIES[0])
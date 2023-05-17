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
const API_KEY = 'AIzaSyDQNaxmJEUQ2_ySf9hL41JpK439DoaBxwY';

let books = bookCatalog.getBookList(BOOK_CATEGORIES[0]);

for (let i = 0; i < 6; i++) {
    bookCatalog.createBook(books[i].author, books[i].cover, books[i].title, books[i].rating, books[i].reviews, books[i].description, books[i].price)
}


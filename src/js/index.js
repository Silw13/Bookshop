import * as slider from './slider.js';
import * as cart from './shoping_cart.js';
import * as bookCatalog from './book-catalog.js';
const BOOK_CATEGORIES = ['subject:Architecture', 'subject:Art', 'subject:Biography&Autobiography', 'subject:Business', 'subject:Crafts&Hobbies', 'subject:Drama', 'subject:Fiction', 'subject:Cooking', 'subject:Health&Fitness', 'subject:History', 'subject:Humor', 'subject:Poetry', 'subject:Psychology', 'subject:Science', 'subject:Technology', 'subject:Travel']


let books = bookCatalog.getBookList(BOOK_CATEGORIES[0]);

console.log(books)
console.log(books.items[0])
console.log(books.items[0].volumeInfo.authors)

//for (let i = 0; i < 6; i++) {
    //bookCatalog.createBook(books[i].volumeInfo.authors[0], books[i].volumeInfo.imageLinks.thumbnail, books[i].volumeInfo.imageLinks.title, books[i].volumeInfo.imageLinks.averageRating, books[i].volumeInfo.imageLinks.ratingsCount, books[i].volumeInfo.imageLinks.description, books[i].volumeInfo.imageLinks.saleInfo.retailPrice)
//}


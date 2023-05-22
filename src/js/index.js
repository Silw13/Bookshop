import * as slider from './slider.js';
import * as cart from './shoping_cart.js';
import * as createBook from './create_book.js';

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

async function getBookList(category, startIndex) {
    let books = [];
    await fetch(`https://www.googleapis.com/books/v1/volumes?q="${category}"&key=${API_KEY}&printType=books&startIndex=${startIndex}&maxResults=6&langRestrict=en`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let book = {};
            for (let i = 0; i < 6; i++) {
                book = {};
                if (data.items[i].volumeInfo.authors.length > 1) {
                    let authors = data.items[i].volumeInfo.authors.join(', ');
                    book.author = authors;
                } else {
                    book.author = data.items[i].volumeInfo.authors[0];
                }
                book.cover = data.items[i].volumeInfo.imageLinks.thumbnail;
                book.title = data.items[i].volumeInfo.title;
                book.rating = data.items[i].volumeInfo.averageRating;
                book.reviews = data.items[i].volumeInfo.ratingsCount;
                book.description = data.items[i].volumeInfo.description;
                if (data.items[i].saleInfo.saleability == "NOT_FOR_SALE") {
                    book.price = 'no data'
                } else {
                    book.price = data.items[i].saleInfo.retailPrice.amount;
                }
                books.push(book);
            }
        });
    return books
}

async function test() {
    let bookList = await getBookList(BOOK_CATEGORIES[4], 0);
    console.log(bookList)
    for (let i = 0; i < 6; i++) {
        createBook.createBook(bookList[i].author, bookList[i].cover, bookList[i].title, bookList[i].rating, bookList[i].reviews, bookList[i].description, bookList[i].price)
    }
}

test();

//let navListItems = document.querySelectorAll(".main-content__navigation-list-item")
//let mainContent = document.querySelector(".main-content__book-catalog")
//
//for (let i = 0; i < navListItems.length; i++) {
//    navListItems[i].addEventListener('click', addBooksOnPage(BOOK_CATEGORIES[i], i))
//}
//
//async function addBooksOnPage(category, catNum) {
//    let navActiveItem = document.querySelector(".main-content__navigation-list-item-active")
//    navActiveItem.classList.toggle('main-content__navigation-list-item-active')
//    navListItems[catNum].classList.toggle('main-content__navigation-list-item-active')
//
//    mainContent.replaceChildren();
//    let bookList = bookCatalog.getBookList(category);
//    for (let i = 0; i < 5; i++) {
//        bookCatalog.createBook(bookList[i].author, bookList[i].cover, bookList[i].title, bookList[i].rating, bookList[i].reviews, bookList[i].description, bookList[i].price)
//    }
//    cart.arrangeBuyButtons();
//}
//
//addBooksOnPage(BOOK_CATEGORIES[0], 0)



// отображение активной категории
// кнопка  больше книг (поиск по классу)
// книги в локал сторидж


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
const BOOK_CATALOG = document.querySelector(".main-content__book-catalog");
const CATEGORY_LI_ITEMS = document.querySelectorAll(".main-content__navigation-list-item");
const BTN_MORE_BOOKS = document.querySelector('.button_load-more-button');
const BOOK_COUNTER_EL = document.querySelector('.header__shoping-cart-quantity')
const BOOK_COUNTER_TXT = document.querySelector('.header__shoping-cart-quantity-text')

let buyButtons = [];
let currectCat;
let bookStartIndex;
let booksOnPage = [];
let booksInCart = [];

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
                if (data.items[i].volumeInfo.authors == undefined) {
                    book.author = 'no author';
                } else if (data.items[i].volumeInfo.authors.length > 1) {
                    let authors = data.items[i].volumeInfo.authors.join(', ');
                    book.author = authors;
                } else {
                    book.author = data.items[i].volumeInfo.authors[0]
                }
                if (data.items[i].volumeInfo.imageLinks == undefined) {
                    book.cover = false
                } else {
                    book.cover = data.items[i].volumeInfo.imageLinks.thumbnail;
                }
                book.title = data.items[i].volumeInfo.title;
                book.rating = data.items[i].volumeInfo.averageRating;
                if (data.items[i].volumeInfo.ratingsCount == undefined) {
                    book.reviews = 'No'
                } else {
                    book.reviews = data.items[i].volumeInfo.ratingsCount;
                }
                book.description = data.items[i].volumeInfo.description;
                if (data.items[i].saleInfo.saleability == "NOT_FOR_SALE") {
                    book.price = 'no data'
                } else if (data.items[i].saleInfo.saleability == "FREE") {
                    book.price = 'free'
                } else {
                    book.price = `${data.items[i].saleInfo.retailPrice.amount} ₽`;
                }
                books.push(book);
            }
        });
    return books
}

async function createBooksOnPage(category, catNum) {
    bookStartIndex = 0;
    currectCat = catNum;
    BOOK_CATALOG.replaceChildren();
    booksOnPage = [];
    let bookList = await getBookList(category, bookStartIndex);
    let navActiveItem = document.querySelector(".main-content__navigation-list-item-active");
    navActiveItem.classList.toggle('main-content__navigation-list-item-active');
    CATEGORY_LI_ITEMS[catNum].classList.toggle('main-content__navigation-list-item-active');
    for (let i = 0; i < 6; i++) {
        booksOnPage.push(bookList[i]);
        createBook.createBook(bookList[i].author, bookList[i].cover, bookList[i].title, bookList[i].rating, bookList[i].reviews, bookList[i].description, bookList[i].price);
    }
}

createBooksOnPage(BOOK_CATEGORIES[0], 0);

for (let n = 0; n < CATEGORY_LI_ITEMS.length; n++) {
    CATEGORY_LI_ITEMS[n].addEventListener('click', () => {
        console.log(n)
        createBooksOnPage(BOOK_CATEGORIES[n], n)
    })
}

async function addMoreBooksOnPage() {
    bookStartIndex = bookStartIndex + 6;
    let bookList = await getBookList(currectCat, bookStartIndex);
    for (let i = 0; i < 6; i++) {
        booksOnPage.push(bookList[i]);
        createBook.createBook(bookList[i].author, bookList[i].cover, bookList[i].title, bookList[i].rating, bookList[i].reviews, bookList[i].description, bookList[i].price);
    }
}

BTN_MORE_BOOKS.addEventListener('click', () => {
    addMoreBooksOnPage()
})







// кнопка  больше книг (поиск по классу)
// книги в локал сторидж
// кнопка купить внизу карточки на постоянке  см как делал в ютолк
// два доп баннера в медиа запросы
// рабочая корзина
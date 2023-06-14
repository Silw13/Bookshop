import * as slider from './slider.js';
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

let booksInCart = [];
if (localStorage.getItem('cachedData') != null) {
    booksInCart = localStorage.getItem('cachedData');
}
let buyButtons = [];
let currectCat;
let bookStartIndex;
let booksOnPage = [];

function addBookToCart(buttonIndex) {
    if (buyButtons[buttonIndex].classList.contains('button_buy-button-active')) {
        buyButtons[buttonIndex].classList.toggle('button_buy-button-active')
        buyButtons[buttonIndex].innerText = 'in the cart'
        booksInCart.push(booksOnPage[buttonIndex])

        const cachedData = localStorage.setItem('cachedData', booksInCart);

        console.log(booksInCart)
        if (booksInCart.length == 1) {
            BOOK_COUNTER_EL.classList.toggle('header__shoping-cart-quantity_disabled')
        }
        BOOK_COUNTER_TXT.innerText = booksInCart.length;
    } else {
        buyButtons[buttonIndex].classList.toggle('button_buy-button-active')
        buyButtons[buttonIndex].innerText = 'buy now'
        booksInCart = booksInCart.filter((book) => book !== booksOnPage[buttonIndex])

        const cachedData = localStorage.setItem('cachedData', booksInCart);

        console.log(booksInCart)
        if (booksInCart.length == 0) {
            BOOK_COUNTER_EL.classList.toggle('header__shoping-cart-quantity_disabled')
        }
        BOOK_COUNTER_TXT.innerText = booksInCart.length;
    }
}

function arrangeBuyButtons(buyButtonStartIndex) {
    buyButtons = [];
    buyButtons = document.querySelectorAll('.button_buy-button')
    for (let i = buyButtonStartIndex; i < buyButtons.length; i++) {
        buyButtons[i].addEventListener('click', () => addBookToCart(i))
        console.log(buyButtons[i])
    }
}

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
    arrangeBuyButtons(bookStartIndex)
    checkBooksOnPage()
}

function checkBooksOnPage() {
    for (let i = 0; i < booksOnPage.length; i++) {
        for (let n = 0; n < booksInCart.length; n++) {
            if (JSON.stringify(booksOnPage[i]) === JSON.stringify(booksInCart[n])) {
                buyButtons[i].classList.toggle('button_buy-button-active')
                buyButtons[i].innerText = 'in the cart'
                return;
            }
        }
    }
}

for (let n = 0; n < CATEGORY_LI_ITEMS.length; n++) {
    CATEGORY_LI_ITEMS[n].addEventListener('click', () => {
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
    arrangeBuyButtons(bookStartIndex)
    checkBooksOnPage()
}

BTN_MORE_BOOKS.addEventListener('click', () => {
    addMoreBooksOnPage()
    //localStorTest()
})

createBooksOnPage(BOOK_CATEGORIES[0], 0);
checkBooksOnPage();


// книги в локал сторидж
// кнопка купить внизу карточки на постоянке  см как делал в ютолк
// два доп баннера в медиа запросы


let testbooks = 0;
function localStorTest() {
    testbooks = testbooks + 1
    const cachedData = localStorage.setItem('cachedData', testbooks)

}

testbooks = localStorage.getItem('cachedData');

console.log(testbooks)

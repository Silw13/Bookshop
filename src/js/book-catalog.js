export function createBook(author, cover, name, rating, reviewNum, description, price) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("main-content__book-card");
    const bookCover = document.createElement("img");
    bookCover.classList.add("main-content__book-cover");
    if (cover == false) {
        bookCover.setAttribute("src", '/img/example-cover.png');
    } else {
        bookCover.setAttribute("src", cover);
    }
    bookCover.setAttribute("alt", "book cover");
    const bookInfo = document.createElement("div");
    bookInfo.classList.add("main-content__book-info");
    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("main-content__book-author");
    if (author.length > 1) {
        let authors = author;
        authors = authors.join(',')
        bookAuthor.textContent = authors;
    } else {
        bookAuthor.textContent = author[0];
    }

    const bookName = document.createElement("p");
    bookName.classList.add("main-content__book-name");
    bookName.textContent = name;

    const bookRating = document.createElement("div");
    bookRating.classList.add("main-content__book-rating");

    for (let i = 0; i = 5; i++) {
        for (let i = 0; i < 5; i++) {
            let starRating = Math.floor(rating)
            let star = document.createElement("span");
            star.classList.add("main-content__book-rating-star");
            star.textContent = "★";
            if (starRating - 1 >= i) {
                star.classList.add("main-content__book-rating-star_active");
            }
            bookRating.append(star)
        }

        const bookReviews = document.createElement("span");
        bookReviews.classList.add("main-content__book-reviews");
        bookReviews.textContent = `${reviewNum} review`;
        const bookDescription = document.createElement("p");
        bookDescription.classList.add("main-content__book-description");
        bookDescription.textContent = description;
        const bookPrice = document.createElement("p");
        bookPrice.classList.add("main-content__book-price");
        bookPrice.textContent = price;
        const buyButton = document.createElement("button");
        buyButton.classList.add("button", "button_buy-button", "button_buy-button-active");
        buyButton.textContent = "buy now";
        bookRating.append(bookReviews);
        bookInfo.append(bookAuthor, bookName, bookRating, bookDescription, bookPrice, buyButton);
        bookCard.append(bookCover, bookInfo);
        const mainContent = document.querySelector(".main-content__book-catalog");
        mainContent.append(bookCard);
    }
    export function getBookList(category) {
        let books = [];
        fetch(`https://www.googleapis.com/books/v1/volumes?q="${category}"&key=${API_KEY}&printType=books&startIndex=0&maxResults=6&langRestrict=en`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let book = {};
                for (let i = 0; i < 6; i++) {
                    book = {};
                    book.author = data.items[i].volumeInfo.authors;
                    book.cover = data.items[i].volumeInfo.imageLinks.thumbnail;
                    book.title = data.items[i].volumeInfo.title;
                    book.rating = data.items[i].volumeInfo.averageRating;
                    book.reviews = data.items[i].volumeInfo.ratingsCount;
                    book.description = data.items[i].volumeInfo.description;
                    book.price = data.items[i].volumeInfo.saleInfo.retailPrice;
                    books.push(book);
                }
            });
        return books
    }
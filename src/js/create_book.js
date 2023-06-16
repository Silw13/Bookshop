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
    bookAuthor.textContent = author;
    const bookName = document.createElement("p");
    bookName.classList.add("main-content__book-name");
    bookName.textContent = name;
    const bookRating = document.createElement("div");

    if (rating != undefined) {

        bookRating.classList.add("main-content__book-rating");
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
        bookRating.append(bookReviews);
    }


    const bookDescription = document.createElement("p");
    bookDescription.classList.add("main-content__book-description");
    bookDescription.textContent = description;
    const bookPrice = document.createElement("p");
    bookPrice.classList.add("main-content__book-price");
    bookPrice.textContent = price;
    const buyButton = document.createElement("button");
    buyButton.classList.add("button", "button_buy-button", "button_buy-button-active");
    buyButton.textContent = "buy now";

    bookInfo.append(bookAuthor, bookName, bookRating, bookDescription, bookPrice, buyButton);
    bookCard.append(bookCover, bookInfo);
    const mainContent = document.querySelector(".main-content__book-catalog");
    mainContent.append(bookCard);
}



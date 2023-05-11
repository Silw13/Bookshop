export function createBook() {
    const bookCard = document.createElement("div");
    bookCard.classList.add("main-content__book-card");

    const bookCover = document.createElement("img");
    bookCover.classList.add("main-content__book-cover");
    bookCover.setAttribute("src", "img/example-cover.png");
    bookCover.setAttribute("alt", "book cover");

    const bookInfo = document.createElement("div");
    bookInfo.classList.add("main-content__book-info");

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("main-content__book-author");
    bookAuthor.textContent = "Kevin Kwan";

    const bookName = document.createElement("p");
    bookName.classList.add("main-content__book-name");
    bookName.textContent = "Crazy rich asians";

    const bookRating = document.createElement("div");
    bookRating.classList.add("main-content__book-rating");

    const star1 = document.createElement("span");
    star1.classList.add("main-contentbook-rating-star", "main-contentbook-rating-star_active");
    star1.textContent = "★";

    const star2 = document.createElement("span");
    star2.classList.add("main-content__book-rating-star");
    star2.textContent = "★";

    const star3 = document.createElement("span");
    star3.classList.add("main-content__book-rating-star");
    star3.textContent = "★";

    const star4 = document.createElement("span");
    star4.classList.add("main-content__book-rating-star");
    star4.textContent = "★";

    const star5 = document.createElement("span");
    star5.classList.add("main-content__book-rating-star");
    star5.textContent = "★";

    const bookReviews = document.createElement("span");
    bookReviews.classList.add("main-content__book-reviews");
    bookReviews.textContent = "252 review";

    const bookDescription = document.createElement("p");
    bookDescription.classList.add("main-content__book-description");
    bookDescription.textContent = "the outrageously funny debut novel about three super-rich, pedigreed Chinese families and the gossip. Chinese families and the gossipChinese families and the gossip";

    const bookPrice = document.createElement("p");
    bookPrice.classList.add("main-content__book-price");
    bookPrice.textContent = "$4.99";

    const buyButton = document.createElement("button");
    buyButton.classList.add("button", "button_buy-button", "button_buy-button-active");
    buyButton.textContent = "buy now";

    bookRating.append(star1, star2, star3, star4, star5, bookReviews);
    bookInfo.append(bookAuthor, bookName, bookRating, bookDescription, bookPrice, buyButton);
    bookCard.append(bookCover, bookInfo);
    
    const mainContent = document.querySelector(".main-content__book-catalog");
    mainContent.append(bookCard);
}
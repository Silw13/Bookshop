const ENTITIES = [
    {
        img: "/img/slide_1.jpg"
    },
    {
        img: "/img/slide_2.jpg"
    },
    {
        img: "/img/slide_3.jpg"
    }
];
const MAIN_PHOTO = document.querySelector('.slider__image');
const DOTS = document.querySelectorAll(".slider__dot");
let currentIndex = 0;

export function setEntity(index) {
    if (currentIndex == index) {
        return;
    } else {
        DOTS[currentIndex].classList.toggle("slider__dot_active");
        DOTS[index].classList.toggle("slider__dot_active");
        MAIN_PHOTO.src = ENTITIES[index].img;
        currentIndex = index;
    }
};



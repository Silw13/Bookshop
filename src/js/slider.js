const ENTITIES = [
    {
        img: "/img/slide_1.png"
    },
    {
        img: "/img/slide_2.png"
    },
    {
        img: "/img/slide_3.png"
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

for (let i = 0; i < DOTS.length; i++) {
    DOTS[i].addEventListener('click', () => {
        setEntity(i);
    });
};

let timer = setInterval(autoChangeDots, 5000);

export function autoChangeDots() {
    if (currentIndex == ENTITIES.length - 1) {
        setEntity(0)
    } else {
        setEntity(currentIndex + 1)
    }
}

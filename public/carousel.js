const carousel_1 = document.querySelector(".carousel_1");
const carousel_2 = document.querySelector(".carousel_2");
const firstCardWidth = carousel_2.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".carousel_1 i");
const carousel_2Childrens = [...carousel_2.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel_2 at once
let cardPerView = Math.round(carousel_2.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel_2 for infinite scrolling
carousel_2Childrens.slice(-cardPerView).reverse().forEach(card => {
    carousel_2.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel_2 for infinite scrolling
carousel_2Childrens.slice(0, cardPerView).forEach(card => {
    carousel_2.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel_2 at appropriate postition to hide first few duplicate cards on Firefox
carousel_2.classList.add("no-transition");
carousel_2.scrollLeft = carousel_2.offsetWidth;
carousel_2.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel_2 left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel_2.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel_2.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel_2
    startX = e.pageX;
    startScrollLeft = carousel_2.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel_2 based on the cursor movement
    carousel_2.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel_2.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel_2 is at the beginning, scroll to the end
    if(carousel_2.scrollLeft === 0) {
        carousel_2.classList.add("no-transition");
        carousel_2.scrollLeft = carousel_2.scrollWidth - (2 * carousel_2.offsetWidth);
        carousel_2.classList.remove("no-transition");
    }
    // If the carousel_2 is at the end, scroll to the beginning
    else if(Math.ceil(carousel_2.scrollLeft) === carousel_2.scrollWidth - carousel_2.offsetWidth) {
        carousel_2.classList.add("no-transition");
        carousel_2.scrollLeft = carousel_2.offsetWidth;
        carousel_2.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel_2
    clearTimeout(timeoutId);
    if(!carousel_1.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel_2 after every 2500 ms
    timeoutId = setTimeout(() => carousel_2.scrollLeft += firstCardWidth, 1500);
}
autoPlay();

carousel_2.addEventListener("mousedown", dragStart);
carousel_2.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel_2.addEventListener("scroll", infiniteScroll);
carousel_1.addEventListener("mouseenter", () => clearTimeout(timeoutId));
carousel_1.addEventListener("mouseleave", autoPlay);
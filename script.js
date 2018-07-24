class Slider {
    consturctor() {
        this.slider = null;
        this.slides = null;
        this.slidesCount = 0;
        this.currentIndex = 0;
        this.time = null;
        this.checkboxes = null;

        this.createSlider();
        this.changeSlide();
        this.createCheckboxes();
    }

    createSlider() {
        this.slider = document.querySelector('.slider');
        this.slides = document.querySelectorAll('.slide');
        this.slidesCount = this.slides.length;
    }

    changeSlide(index) {

        for (let i = 0; i < this.slides.length; i++) {
            this.slides[i].classList.remove('slide--active');
            this.checkboxes.children[i].firstChild.checked = false;
        };
        this.slides[index].classList.add('slide--active');
        this.currentIndex = index;

        this.checkboxes.children[index].firstChild.checked = true;

        clearInterval(this.time);
        this.time = setTimeout(function () {
            this.nextSlide()
        }.bind(this), 5000);

    }
    createCheckboxes() {
        this.checkboxes = document.querySelector('.checkboxes')
        for (let i = 0; i < this.slidesCount; i++) {

            let checkboxContainer = document.createElement('label');
            checkboxContainer.classList.add('checkbox-container');
            let input = document.createElement('input');
            input.type = "checkbox";
            let checkbox = document.createElement('div');
            checkbox.classList.add('checkbox');

            checkboxContainer.addEventListener('click', function () {
                this.changeSlide(i);
            }.bind(this));

            checkboxContainer.appendChild(input);
            checkboxContainer.appendChild(checkbox);
            this.checkboxes.appendChild(checkboxContainer);
        }

    }

    nextSlide() {
        if (this.currentIndex < this.slidesCount - 1) {
            this.currentIndex++;
        } else this.currentIndex = 0;
        this.changeSlide(this.currentIndex);
    }
}

function scrollToElement(elementName) {

    document.querySelector(elementName).scrollIntoView({
        behavior: 'smooth'
    });

}

function calculateTop(el) {

    _top = 0;
    do {
        _top = _top + el.offsetTop;
        el = el.offsetParent;
    }
    while (el != document.body)

    return _top;
}

function animateElements() {

    menuItems = document.querySelectorAll('.menu-item');

    for (let [index, menuItem] of menuItems.entries()) {
        if (window.pageYOffset + window.innerHeight > calculateTop(menuItem)) {
            if (index % 2 == 0) {
                menuItem.classList.add('animate-left');
            } else {
                menuItem.classList.add('animate-right');
            }
        } else {
            menuItem.classList.remove('animate-left');
            menuItem.classList.remove('animate-right');
        }
    }
}


var getAbsPosition = function (el) {
    var el2 = el;
    var curtop = 0;
    var curleft = 0;
    if (document.getElementById || document.all) {
        do {
            curleft += el.offsetLeft - el.scrollLeft;
            curtop += el.offsetTop - el.scrollTop;
            el = el.offsetParent;
            el2 = el2.parentNode;
            while (el2 != el) {
                curleft -= el2.scrollLeft;
                curtop -= el2.scrollTop;
                el2 = el2.parentNode;
            }
        } while (el.offsetParent);

    } else if (document.layers) {
        curtop += el.y;
        curleft += el.x;
    }
    return curtop;
};

document.addEventListener("DOMContentLoaded", function () {
    const slide = new Slider();
    slide.createSlider();
    slide.createCheckboxes();
    slide.changeSlide(0);
    // menuItems = document.querySelectorAll('.white-rectangle');
    // calculateTop(menuItems[0]);
    window.onscroll = function () {
        animateElements();
    };

});
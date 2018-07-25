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

function calculateTop(element) {

    _top = 0;
    do {
        _top = _top + element.offsetTop;
        element = element.offsetParent;
    }
    while (element != document.body)

    return _top;
}

function animateElements(menuItems, sections) {

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

    for (let section of sections) {

        if (window.pageYOffset + window.innerHeight - 200 > calculateTop(section)) {
            [].slice.call(section.children).forEach(child => {
                child.classList.add('animate-up')
            })

        }
    }
}

function subscribe() {
    event.preventDefault();
    snackbar = document.createElement('div');
    snackbar.classList.add('snackbar');
    text = document.createTextNode("You have successfully subscribed to the newsletter!")
    snackbar.appendChild(text);

    if (document.querySelector('.snackbar') == null) {
        document.querySelector('body').appendChild(snackbar);
        setTimeout(function () {
            snackbar.classList.add('snackbar-active');
            setTimeout(function () {
                snackbar.classList.remove('snackbar-active');
                setTimeout(function () {
                    document.querySelector('body').removeChild(document.querySelector('.snackbar'));
                }, 1000);
            }, 3000);
        }, 100);
    }

}

document.addEventListener("DOMContentLoaded", function () {
    const slide = new Slider();
    slide.createSlider();
    slide.createCheckboxes();
    slide.changeSlide(0);

    menuItems = document.querySelectorAll('.menu-item');
    sections = document.querySelectorAll('section');
    buttons = document.querySelectorAll('button');


    document.querySelector(".subscribe-input").addEventListener("invalid",
        function (event) {
            event.preventDefault();
        });

    window.onscroll = function () {
        animateElements(menuItems, sections);
    };

});
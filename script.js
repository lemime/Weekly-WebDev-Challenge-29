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

document.addEventListener("DOMContentLoaded", function () {
    const slide = new Slider();
    slide.createSlider();
    slide.createCheckboxes();
    slide.changeSlide(0);
});
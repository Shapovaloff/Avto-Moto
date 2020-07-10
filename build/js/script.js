'use strict';

// Функция слайдер
(function () {
  var sliderElement = document.querySelectorAll('.slider__item');
  var previewElemtnt = document.querySelectorAll('.preview__item');
  var prewButton = document.querySelector('.preview__btn--prew');
  var nextButton = document.querySelector('.preview__btn--next');

  var findCurrentSlide = function () {
    var index;
    for (var i = 0; i < sliderElement.length; i++) {
      if (sliderElement[i].classList.contains('slider__item--active')) {
        index = i;
      }
    }
    return index;
  };

  var indexSlider = findCurrentSlide();

  var activeSlide = function (index) {
    for (var i = 0; i < sliderElement.length; i++) {
      sliderElement[i].classList.remove('slider__item--active');
    }

    sliderElement[index].classList.add('slider__item--active');
  };

  var buttonActive = function (index) {
    if (index === sliderElement.length - 1) {
      nextButton.disabled = true;
      prewButton.disabled = false;
    } else if (index === 0) {
      prewButton.disabled = true;
      nextButton.disabled = false;
    } else {
      prewButton.disabled = false;
      nextButton.disabled = false;
    }
  };

  var nextSlide = function () {
    indexSlider++;
    buttonActive(indexSlider);
    activeSlide(indexSlider);
  };

  var prewSlide = function () {
    indexSlider--;
    buttonActive(indexSlider);
    activeSlide(indexSlider);
  };

  previewElemtnt.forEach(function (item, indexItem) {
    item.addEventListener('click', function () {
      indexSlider = indexItem;
      buttonActive(indexSlider);
      activeSlide(indexSlider);
    });
  });

  nextButton.addEventListener('click', nextSlide);
  prewButton.addEventListener('click', prewSlide);
})();

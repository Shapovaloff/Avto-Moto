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

// Функция переключение табов

(function () {
  var tabsButtons = document.querySelectorAll('.card-description__btn');
  var tabsElement = document.querySelectorAll('.tabs');

  var activeTabsButton = function (indexButtons) {
    tabsButtons.forEach(function (item) {
      item.classList.remove('card-description__btn--active');

      if (indexButtons === item) {
        item.classList.add('card-description__btn--active');
      }
    });
  };

  var activeTabsElement = function (indexElement) {
    tabsElement.forEach(function (item, index) {
      item.classList.remove('tabs--active');
      if (index === indexElement) {
        item.classList.add('tabs--active');
      }
    });
  };

  tabsButtons.forEach(function (item, index) {
    item.addEventListener('click', function () {
      activeTabsButton(index);
      activeTabsElement(index);
    });
  });
})();


(function () {
  window.initMap = function () {

    var uluruMap = {lat: 59.9676957, lng: 30.3220136};
    var uluruPin = {lat: 59.968408, lng: 30.317078};
    var mapElement = document.querySelector('.contacts__map--card');
    var ZOOM_CONTROL = 14.6;
    var imgePins = 'img/map-pin.svg';

    var map = new google.maps.Map(mapElement, {
      zoom: ZOOM_CONTROL,
      mapTypeControl: false,
      zoomControl: true,
      scrollwheel: false,
      streetViewControl: false,
      center: uluruMap
    });

    var image = {
      url: imgePins,
      size: new google.maps.Size(32, 40),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 40),
      scaledSize: new google.maps.Size(32, 40)
    };

    var beachMarker = new google.maps.Marker({
      position: uluruPin,
      map: map,
    });

    beachMarker.setIcon(image);
  };
})();

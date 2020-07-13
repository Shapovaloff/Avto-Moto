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

  tabsElement.forEach(function (item) {
    item.classList.remove('tabs--nojs');
  });

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
      activeTabsElement(index);
      activeTabsButton(item);
    });
  });
})();

// Функция отрисовки карты

(function () {
  window.initMap = function () {

    var uluruMap = {lat: 59.9676957, lng: 30.3220136};
    var uluruPin = {lat: 59.968408, lng: 30.317078};
    var mapElement = document.querySelector('.contacts__map-card');
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


// Функция модального окна

(function () {
  var newReviews = [];
  var starRaiting = ['8', '17', '29', '37', '50', '58', '71', '79', '92', '100'];

  var openButton = document.querySelector('.reviews__btn-feedback');
  var popup = document.querySelector('.popup__container');
  var popupOverlay = document.querySelector('.popup__overlay');
  var bodyElement = document.querySelector('body');
  var closeButton = popup.querySelector('.popup__close');

  var fieldName = popup.querySelector('.popup__field--name');
  var fieldAdvantages = popup.querySelector('.popup__field--advantages');
  var fieldDisadvantages = popup.querySelector('.popup__field--disadvantages');
  var fieldStars = document.querySelectorAll('.popup__input');
  var fieldText = popup.querySelector('.popup__field--text');

  var messageInput = document.querySelector('.popup__required-input');
  var messageTextarea = document.querySelector('.popup__required-textarea');

  var listReviews = document.querySelector('.reviews__description');
  var popupForm = document.querySelector('.popup__form');
  var template = document.querySelector('.template').content;
  var newItemReviews = template.querySelector('.reviews__description-item');

  var isStirageSupport = true;

  var loadReviews = function () {
    if (localStorage.getItem('newReviews') && isStirageSupport) {
      newReviews = JSON.parse(localStorage.getItem('newReviews'));

      newReviews.forEach(function (item) {
        var reviews = newItemReviews.cloneNode(true);

        reviews.querySelector('.reviews__name').textContent = item.name;
        reviews.querySelector('.reviews__text--advantages').textContent = item.advantages;
        reviews.querySelector('.reviews__text--disadvantages').textContent = item.disadvantages;
        reviews.querySelector('.reviews__text--comment').textContent = item.text;
        listReviews.appendChild(reviews);
      });
    }
  };

  loadReviews();

  var openPopup = function (evt) {
    evt.preventDefault();
    popupOverlay.classList.remove('popup__overlay--hidden');
    popup.classList.remove('popup__container--hidden');
    bodyElement.classList.add('no-scroll');
  };

  var closePopup = function (evt) {
    evt.preventDefault();
    popupOverlay.classList.add('popup__overlay--hidden');
    popup.classList.add('popup__container--hidden');
    bodyElement.classList.remove('no-scroll');
  };

  openButton.addEventListener('click', function (evt) {
    openPopup(evt);
    fieldName.focus();
  });

  closeButton.addEventListener('click', function (evt) {
    closePopup(evt);
  });

  popupOverlay.addEventListener('click', function (evt) {
    closePopup(evt);
  });

  popupForm.addEventListener('submit', function (evt) {
    if (!fieldName.value || !fieldText.value) {
      evt.preventDefault();
      if (!fieldName.value) {
        fieldName.classList.add('popup__field--required');
        messageInput.classList.remove('popup__required-hidden');
      }

      fieldName.addEventListener('input', function () {
        fieldName.classList.remove('popup__field--required');
        messageInput.classList.add('popup__required-hidden');
      });

      if (!fieldText.value) {
        fieldText.classList.add('popup__field--required');
        messageTextarea.classList.remove('popup__required-hidden');
      }

      fieldText.addEventListener('input', function () {
        fieldText.classList.remove('popup__field--required');
        messageTextarea.classList.add('popup__required-hidden');
      });

    } else {
      evt.preventDefault();

      var fieldStarsValue;
      for (var i = 0; i < fieldStars.length; i++) {
        if (fieldStars[i].checked) {
          fieldStarsValue = fieldStars[i].value;
        }
      }

      var reviews = newItemReviews.cloneNode(true);
      reviews.querySelector('.reviews__name').textContent = fieldName.value;
      reviews.querySelector('.reviews__text--advantages').textContent = fieldAdvantages.value;
      reviews.querySelector('.reviews__text--disadvantages').textContent = fieldDisadvantages.value;
      reviews.querySelector('.reviews__stars-raiting').style.width = starRaiting[fieldStarsValue - 1] + 'px';
      reviews.querySelector('.reviews__text--comment').textContent = fieldText.value;
      listReviews.appendChild(reviews);

      if (isStirageSupport) {
        var review = {
          name: fieldName.value,
          advantages: fieldAdvantages.value,
          disadvantages: fieldDisadvantages.value,
          star: fieldStarsValue,
          text: fieldText.value
        };

        newReviews.push(review);
        localStorage.setItem('newReviews', JSON.stringify(newReviews));
      }

      fieldName.value = '';
      fieldAdvantages.value = '';
      fieldDisadvantages.value = '';
      fieldText.value = '';
      fieldStars[0].checked = true;

      closePopup(evt);
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      if (!popup.classList.contains('popup__container--hidden')) {
        closePopup(evt);
      }
    }
  });

})();

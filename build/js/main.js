'use strict';

// Функция слайдер

(function () {
  var indexSliderActive = 0;
  var sliderElement = document.querySelectorAll('.slider__item');
  var previewElemtnt = document.querySelectorAll('.preview__item');
  var prewButton = document.querySelector('.preview__btn--prew');
  var nextButton = document.querySelector('.preview__btn--next');


  var activeSlide = function (index) {
    sliderElement.forEach(function (slider) {
      slider.classList.remove('slider__item--active');
    });
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
    indexSliderActive++;
    buttonActive(indexSliderActive);
    activeSlide(indexSliderActive);
  };

  var prewSlide = function () {
    indexSliderActive--;
    buttonActive(indexSliderActive);
    activeSlide(indexSliderActive);
  };

  previewElemtnt.forEach(function (item, indexItem) {
    item.addEventListener('click', function () {
      indexSliderActive = indexItem;
      buttonActive(indexSliderActive);
      activeSlide(indexSliderActive);
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

// Функция открытия и загрытия модального окна

(function () {
  var ESCAPE = 27;
  var popup = document.querySelector('.popup__container');
  var openButton = document.querySelector('.reviews__btn-feedback');
  var popupOverlay = document.querySelector('.popup__overlay');
  var bodyElement = document.querySelector('body');
  var closeButton = popup.querySelector('.popup__close');
  var fieldName = popup.querySelector('.popup__field--name');

  var openPopup = function (evt) {
    evt.preventDefault();
    popupOverlay.classList.remove('popup__overlay--hidden');
    popup.classList.remove('popup__container--hidden');
    bodyElement.classList.add('no-scroll');
  };

  window.closePopup = function (evt) {
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
    window.closePopup(evt);
  });

  popupOverlay.addEventListener('click', function (evt) {
    window.closePopup(evt);
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESCAPE) {
      if (!popup.classList.contains('popup__container--hidden')) {
        window.closePopup(evt);
      }
    }
  });
})();

// Функция валидации формы

(function () {
  var popup = document.querySelector('.popup__container');
  var messageInput = document.querySelector('.popup__required-input');
  var messageTextarea = document.querySelector('.popup__required-textarea');
  var fieldName = popup.querySelector('.popup__field--name');
  var fieldText = popup.querySelector('.popup__field--text');

  var validatesField = function (fieldsName, fieldsMessage) {
    if (!fieldsName.value) {
      fieldsName.classList.add('popup__field--required');
      fieldsMessage.classList.remove('popup__required-hidden');
    }
  };

  var requiredField = function (fieldsName, fieldsMessage) {
    fieldsName.addEventListener('input', function () {
      fieldsName.classList.remove('popup__field--required');
      fieldsMessage.classList.add('popup__required-hidden');
    });
  };

  window.validatesForm = function (evt) {
    evt.preventDefault();
    validatesField(fieldName, messageInput);
    validatesField(fieldText, messageTextarea);
  };

  requiredField(fieldName, messageInput);
  requiredField(fieldText, messageTextarea);
})();


// Функция отрисовки отзывов

(function () {
  var newReviews = [];
  var starRaiting = ['8', '17', '29', '37', '50', '58', '71', '79', '92', '100'];
  var popup = document.querySelector('.popup__container');

  var fieldName = popup.querySelector('.popup__field--name');
  var fieldAdvantages = popup.querySelector('.popup__field--advantages');
  var fieldDisadvantages = popup.querySelector('.popup__field--disadvantages');
  var fieldStars = popup.querySelectorAll('.popup__input');
  var fieldText = popup.querySelector('.popup__field--text');

  var listReviews = document.querySelector('.reviews__description');
  var reviewsItem = listReviews.querySelector('.reviews__description-item');
  var popupForm = document.querySelector('.popup__form');

  var renderReviews = function (item) {
    var reviews = reviewsItem.cloneNode(true);
    reviews.querySelector('.reviews__name').textContent = item.name;
    reviews.querySelector('.reviews__text--advantages').textContent = item.advantages;
    reviews.querySelector('.reviews__text--disadvantages').textContent = item.disadvantages;
    reviews.querySelector('.reviews__stars-raiting').style.width = starRaiting[item.star] + 'px';
    reviews.querySelector('.reviews__text--comment').textContent = item.text;
    listReviews.appendChild(reviews);
  };

  var isStorageSupport = true;
  var storage = '';

  try {
    storage = localStorage.getItem('newReviews');
  } catch (err) {
    isStorageSupport = false;
  }

  var loadReviews = function () {
    if (storage && isStorageSupport) {
      newReviews = JSON.parse(storage);

      newReviews.forEach(function (item) {
        renderReviews(item);
      });
    }
  };

  loadReviews();

  var saveReviews = function () {
    if (isStorageSupport) {
      localStorage.setItem('newReviews', JSON.stringify(newReviews));
    }
  };

  var showReviews = function (evt) {
    evt.preventDefault();
    var fieldStarsValue;

    fieldStars.forEach(function (star) {
      if (star.checked) {
        fieldStarsValue = star.value - 1;
      }
    });

    var review = {
      name: fieldName.value,
      advantages: fieldAdvantages.value,
      disadvantages: fieldDisadvantages.value,
      star: fieldStarsValue,
      text: fieldText.value
    };

    fieldName.value = '';
    fieldAdvantages.value = '';
    fieldDisadvantages.value = '';
    fieldText.value = '';
    fieldStars[0].checked = true;
    newReviews.push(review);

    renderReviews(review);
    saveReviews();
  };

  popupForm.addEventListener('submit', function (evt) {
    if (!fieldName.value || !fieldText.value) {
      window.validatesForm(evt);
    } else {
      showReviews(evt);
      window.closePopup(evt);
    }
  });
})();

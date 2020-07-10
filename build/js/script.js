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
      activeTabsElement(index);
      activeTabsButton(item);
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

// Функция открытия и закрытия модального окна

(function () {
  var ESCAPE = 'Escape';
  var popup = document.querySelector('.popup__container');
  var openButton = document.querySelector('.reviews__btn-feedback');
  var closeButton = popup.querySelector('.popup__close');
  var userNameInput = document.querySelector('.popop__field--name');
  var bodyElement = document.querySelector('body');
  var popupOverlay = document.querySelector('.popup__overlay');


  var noScroll = function () {
    bodyElement.classList.add('no-scroll');
  };

  var removeNoScroll = function () {
    bodyElement.classList.remove('no-scroll');
  };

  var openPopup = function () {
    popupOverlay.classList.remove('popup__overlay--hidden');
    popup.classList.remove('popup--hidden');
    noScroll();
    userNameInput.focus();
  };

  var closePopup = function () {
    popupOverlay.classList.add('popup__overlay--hidden');
    popup.classList.add('popup--hidden');
    removeNoScroll();
  };

  var onPopupEscPres = function (evt) {
    if (evt.key === ESCAPE) {
      closePopup();
    }
  };


  openButton.addEventListener('click', function () {
    openPopup();
    document.addEventListener('keydown', onPopupEscPres);
  });

  popupOverlay.addEventListener('click', function () {
    closePopup();
    document.removeEventListener('keydown', onPopupEscPres);
  });

  closeButton.addEventListener('click', function () {
    closePopup();
    document.removeEventListener('keydown', onPopupEscPres);
  });
})();

// Функция валидации формы

(function () {
  var userNameInput = document.querySelector('.popop__field--name');
  var messageInput = document.querySelector('.popup__required-input');
  var userComentText = document.querySelector('.popop__field--text');
  var messageTextarea = document.querySelector('.popup__required--textarea');
  var popupForm = document.querySelector('.popup__form');

  var createRequired = function (item, message) {
    item.classList.add('popop__field--required');
    message.classList.remove('popup__required--hidden');
  };

  var removeRequired = function (item, message) {
    item.classList.remove('popop__field--required');
    message.classList.add('popup__required--hidden');
  };

  var submitFunction = function (evt, field, message) {
    if (!field.value) {
      evt.preventDefault();
      createRequired(field, message);

      if (!field.value) {
        field.focus();
      }

      field.addEventListener('keydown', function () {
        removeRequired(field, message);
      });
    }
  };

  popupForm.addEventListener('submit', function (evt) {
    submitFunction(evt, userNameInput, messageInput);
    submitFunction(evt, userComentText, messageTextarea);
  });
})();

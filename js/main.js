// Лекция 3 д/з часть 1

// 1.Напишите функцию для создания массива из 8 сгенерированных JS-объектов.
//  Каждый объект массива ‐ описание похожего объявления неподалёку.
var OFFSET_LEFT_MAX = 1200;
var OFFSET_LEFT_MIN = 50;
var OFFSET_TOP_MAX = 630;
var OFFSET_TOP_MIN = 130;
var PRICE_MAX = 1000;
var PRICE_MIN = 10;
var ROOMS_MAX = 50;
var ROOMS_MIN = 1;
var GUESTS_MAX = 50;
var GUESTS_MIN = 1;
var ARRAY_OFFER = ['palace', 'flat', 'house', 'bungalo'];
var ARRAY_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ARRAY_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var ARRAY_CHECKIN = ['12:00', '13:00', '14:00'];
var ARRAY_CHECKOUT = ['12:00', '13:00', '14:00'];
var MARK_WIDTH = 50;
var MARK_HEIGHT = 70;

// получение случайного элемента массива
var getArrayRandElement = function (array) {
  var rand = Math.floor(Math.random() * array.length);
  return array[rand];
};

// получение нескольких случайных элеменов массива
var getArrayRandElements = function (array) {
  var clone = array.slice();
  var newArray = [];
  var randomCount = Math.floor(Math.random() * array.length);

  if (isNaN(randomCount)) {
    randomCount = 1;
  } else {
    if (randomCount > array.length) {
      randomCount = array.length;
    }
  }
  for (var i = 0; i < randomCount; i++) {
    newArray.push(clone.splice(Math.floor(Math.random() * clone.length), 1));
  }
  return newArray;
};

//  функция рендом чисел с пределами - для получения координат меток, диапазона цен, количества комнат и проч
var getValueRandom = function (max, min) {
  var randNumber = Math.floor(Math.random() * (max - min) + min);
  return randNumber;
};

// функция для создания одного элемиента-объявления
var createAd = function (itemNumber) {
  var ad = {};
  var adAuthor = {};
  var adOffer = {};
  var adLocation = {};
  var a = itemNumber + 1;

  adAuthor.avatar = 'img/avatars/user0' + a + '.png';

  adLocation.x = getValueRandom(OFFSET_LEFT_MAX, OFFSET_LEFT_MIN);
  // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
  adLocation.y = getValueRandom(OFFSET_TOP_MAX, OFFSET_TOP_MIN);
  // случайное число, координата y метки на карте от 130 до 630.

  adOffer.title = 'Предложение ' + a;
  adOffer.address = '(' + adLocation.x + ', ' + adLocation.y + ')';
  adOffer.price = getValueRandom(PRICE_MAX, PRICE_MIN);
  adOffer.type = getArrayRandElement(ARRAY_OFFER);
  adOffer.rooms = getValueRandom(ROOMS_MAX, ROOMS_MIN);
  adOffer.guests = getValueRandom(GUESTS_MAX, GUESTS_MIN);
  adOffer.checkin = getArrayRandElement(ARRAY_CHECKIN);
  adOffer.checkout = getArrayRandElement(ARRAY_CHECKOUT);
  adOffer.features = getArrayRandElements(ARRAY_FEATURES);
  adOffer.description = 'Текст описания ' + a;
  adOffer.photos = getArrayRandElements(ARRAY_PHOTOS);


  ad.author = adAuthor;
  ad.offer = adOffer;
  ad.location = adLocation;

  return ad;
};

// фунция для создания массива из объектов-оъявлений
var createAds = function (elementsCount) {
  var adsArray = [];
  for (var i = 0; i < elementsCount; i++) {
    adsArray[i] = createAd(i);
  }
  // console.log(adsArray);
  return adsArray;

};

var adData = createAds(8);

// 2. У блока .map уберите класс .map--faded.
document.querySelector('.map').classList.remove('map--faded');

// 3.На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте,
// и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin.
var adTemplate = document.querySelector('#pin').content.querySelector('button');

var createAdElement = function (elementNumber) {
  var a = elementNumber;
  var adElement = adTemplate.cloneNode(true);


  var adtop = adData[a].location.y - MARK_HEIGHT + 'px';
  var adleft = adData[a].location.x - MARK_WIDTH / 2 + 'px';

  adElement.style.left = adleft;
  adElement.style.top = adtop;
  adElement.children[0].src = adData[a].author.avatar;
  adElement.children[0].alt = adData[a].offer.title;
  return adElement;
};

// 4.Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.
var fragment = document.createDocumentFragment();
var adList = document.querySelector('.map__pins');

var getAdElements = function () {
  for (var i = 0; i < adData.length; i++) {
    var createElement = createAdElement(i);
    fragment.appendChild(createElement);
  }
  adList.appendChild(fragment);
};
getAdElements();

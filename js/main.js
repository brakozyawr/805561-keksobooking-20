// Лекция 3 д/з часть 1

// 1.Напишите функцию для создания массива из 8 сгенерированных JS-объектов.
//  Каждый объект массива ‐ описание похожего объявления неподалёку.


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

  var offsetLeftMax = 1200;
  var offsetLeftMin = 50;
  var offsetTopMax = 630;
  var offsetTopMin = 130;
  var priceMax = 1000;
  var priceMin = 10;
  var roomsMax = 50;
  var roomsMin = 1;
  var guestsMax = 50;
  var guestsMin = 1;
  var arrayOffer = ['palace', 'flat', 'house', 'bungalo'];
  var arrayfeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var arrayPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var arrayCheckin = ['12:00', '13:00', '14:00'];
  var arrayCheckout = ['12:00', '13:00', '14:00'];

  var ad = {};
  var adAuthor = {};
  var adOffer = {};
  var adLocation = {};
  var a = itemNumber + 1;

  adAuthor.avatar = 'img/avatars/user0' + a + '.png';

  adLocation.x = getValueRandom(offsetLeftMax, offsetLeftMin);
  // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
  adLocation.y = getValueRandom(offsetTopMax, offsetTopMin);
  // случайное число, координата y метки на карте от 130 до 630.

  adOffer.title = 'Предложение ' + a;
  adOffer.address = '(' + adLocation.x + ', ' + adLocation.y + ')';
  adOffer.price = getValueRandom(priceMax, priceMin);
  adOffer.type = getArrayRandElement(arrayOffer);
  adOffer.rooms = getValueRandom(roomsMax, roomsMin);
  adOffer.guests = getValueRandom(guestsMax, guestsMin);
  adOffer.checkin = getArrayRandElement(arrayCheckin);
  adOffer.checkout = getArrayRandElement(arrayCheckout);
  adOffer.features = getArrayRandElements(arrayfeatures);
  adOffer.description = 'Текст описания ' + a;
  adOffer.photos = getArrayRandElements(arrayPhotos);


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
  var markWidth = 50;
  var markHeight = 70;

  var adtop = adData[a].location.y - markHeight + 'px';
  var adleft = adData[a].location.x - markWidth / 2 + 'px';

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

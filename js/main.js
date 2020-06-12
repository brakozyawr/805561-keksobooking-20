// Лекция 3 д/з часть 1

// 1.Напишите функцию для создания массива из 8 сгенерированных JS-объектов.
//  Каждый объект массива ‐ описание похожего объявления неподалёку.

// получение случайного элемента массива
var arrayRandElement = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// получение нескольких случайных элеменов массива
var arrayRandElements = function (array) {
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

// Можно еще вынести сюда фуекцию рендом чисел с пределами
// функция для создания одного элемиента-объявления
var createAd = function (itemNumber) {
  var ad = {};
  var adAuthor = {};
  var adOffer = {};
  var adLocation = {};
  var a = itemNumber + 1;

  adAuthor.avatar = 'img/avatars/user0' + a + '.png';


  adLocation.x = Math.floor(Math.random() * 1199 + 1);
  // случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
  adLocation.y = Math.floor(Math.random() * 500 + 130);
  // случайное число, координата y метки на карте от 130 до 630.


  adOffer.title = 'Предложение ' + a;
  adOffer.address = '(' + adLocation.x + ', ' + adLocation.y + ')';
  adOffer.price = Math.floor(Math.random()) * 1000 + 10;

  var arrayOffer = ['palace', 'flat', 'house', 'bungalo'];
  adOffer.type = arrayRandElement(arrayOffer);

  adOffer.rooms = Math.floor(Math.random()) * 50 + 1;

  adOffer.guests = Math.floor(Math.random()) * 50 + 1;

  var arrayCheckin = ['12:00', '13:00', '14:00'];
  adOffer.checkin = arrayRandElement(arrayCheckin);

  var arrayCheckout = ['12:00', '13:00', '14:00'];
  adOffer.checkout = arrayRandElement(arrayCheckout);

  var arrayfeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  adOffer.features = arrayRandElements(arrayfeatures);
  adOffer.description = 'Текст описания ' + a;

  var arrayPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  adOffer.photos = arrayRandElements(arrayPhotos);


  ad.author = adAuthor;
  ad.offer = adOffer;
  ad.location = adLocation;
  // console.log(ad);
  return ad;
};

// фунция для создания массива из объектов-оъявлений
var createAds = function () {
  var adsArray = [];
  for (var i = 0; i < 8; i++) {
    adsArray[i] = createAd(i);
  }
  console.log(adsArray);
  return adsArray;

};

var adData = createAds();

// 2. У блока .map уберите класс .map--faded.
document.querySelector('.map').classList.remove('map--faded');

// 3.На основе данных, созданных в первом пункте, создайте DOM-элементы, соответствующие меткам на карте,
// и заполните их данными из массива. Итоговую разметку метки .map__pin можно взять из шаблона #pin.


var adTemplate = document.querySelector('#pin').content.querySelector('button');
var adList = document.querySelector('.map__pins');


for (var i = 0; i < adData.length; i++) {
  var adElement = adTemplate.cloneNode(true);

  var top = adData[i].location.y + 70 + 'px';
  var left = adData[i].location.x + 25 + 'px';

  adElement.style.left = left;
  adElement.style.top = top;
  adElement.children[0].src = adData[i].author.avatar;
  adElement.children[0].alt = adData[i].offer.title;
  adList.appendChild(adElement);

}

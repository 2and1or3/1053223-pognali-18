var header = document.querySelector('.header');
if (header) {
  var headerToggle = header.querySelector('.header__toggle');

  header.classList.remove('header_opened');
  header.classList.remove('header_no-js');

  headerToggle.addEventListener("click", function(evt) {
    evt.preventDefault();
    header.classList.toggle('header_opened');
  });
}

var offerButton = document.querySelector('.offer__button');
var businessOffer = document.querySelector('.business-offer');
if (businessOffer) {
  var offerClose = businessOffer.querySelector('.business-offer__button');

  offerButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    businessOffer.classList.add('popup_show');
  });

  offerClose.addEventListener("click", function(evt) {
    evt.preventDefault();
    businessOffer.classList.remove('popup_show');
  });
}

var listFilter = document.querySelector('.list-filter');
if (listFilter) {
  var filterButtonTitle = listFilter.querySelector('.list-filter__button_title');
  var filterButtonToggle = listFilter.querySelector('.list-filter__button_show-all');
  var filterButtonClose = listFilter.querySelector('.list-filter__button-close');

  listFilter.classList.remove('list-filter_no-js');
  listFilter.classList.remove('list-filter_active');

  filterButtonTitle.addEventListener("click", function(evt) {
    evt.preventDefault();
    listFilter.classList.toggle('list-filter_active');
  });

  filterButtonToggle.addEventListener("click", function(evt) {
    evt.preventDefault();
    listFilter.classList.toggle('list-filter_active');
  });

  filterButtonClose.addEventListener("click", function(evt) {
    evt.preventDefault();
    listFilter.classList.remove('list-filter_active');
  });
}

var stepSelect = document.querySelector('.step__select_empty');
if (stepSelect) {
  var selectControl = stepSelect.querySelector('.select__control');

  selectControl.addEventListener("click", function(evt) {
    evt.preventDefault();
    stepSelect.classList.toggle('select_active');
  });
}

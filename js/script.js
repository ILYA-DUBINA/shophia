'use strict'

//? открытие меню бургер на jQuery------------------------------------------
$(document).ready(function(){
   $('.header__burger').click(function(event){
      $('.header__menu-nav, .header__burger').toggleClass('active');
      $('body').toggleClass('_lock');
   });
});

//? ///////////////////открытие меню бургер на jQuery------------------------------------------

//? открытие выподающего списка и стрелки------------------------------------------
const selectMenu = document.querySelector('.header__footer-list');
const headerArrow = document.querySelector('.header__arrow-img');
const selectOption = document.querySelectorAll('.header__footer-option');
const selectSpan = document.querySelector('.header__footer-list-span');
const textElementContent = selectSpan.textContent;

selectMenu.addEventListener('click', function(e){
   headerArrow.classList.toggle('arrow');
   selectMenu.classList.toggle('list-height');
   for(let index = 0; index < selectOption.length; index++) { 
      selectOption[index].classList.toggle('open');    
   }      
});  

for (let i = 0; i < selectOption.length; i++) {
  selectOption[i].addEventListener('click', (evt) => {
    selectSpan.textContent = evt.target.textContent;
  });
}

//? ///////////////////открытие выподающего списка и стрелки------------------------------------------

//? подготовленая инициализация jQuery для слайдера------------------------------------------
$(document).ready(function(){
   $('.slider__items').slick({
      arrows:true,
      dots:true,
   });
});

//? ///////////////////подготовленая инициализация jQuery для слайдера------------------------------------------

//? плавная прокрутка в верх страницы на jQuery ------------------------------------------
$(document).on("click", ".footer__down-arrow", function(e) {
    e.preventDefault();
    $('body, html').animate({scrollTop: 0}, 1000);
});

//? ///////////////////плавная прокрутка в верх страницы на jQuery ------------------------------------------

//? динамический адаптив(кузнечик) на JS ------------------------------------------
function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};
//? короткий вызов ------------------------------------------
const da = new DynamicAdapt("max");  
da.init();

//? ///////////////////динамический адаптив(кузнечик) на JS ------------------------------------------

//? открытие меню footer ------------------------------------------
const menuTitle = document.querySelectorAll('.footer__menu-title');

for(let i=0; i<menuTitle.length; i++){			
      let thisTitle=menuTitle[i]; 
      let subMenu=menuTitle[i].nextElementSibling;

   thisTitle.addEventListener('click', function(){
      subMenu.classList.toggle('open__menu-text');
      thisTitle.classList.toggle('active-arrow');
   });
}

//? ///////////////////открытие меню footer ------------------------------------------
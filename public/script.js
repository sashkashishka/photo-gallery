var gall =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./css/style.css":
/*!***********************!*\
  !*** ./css/style.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./js/AJAX.js":
/*!********************!*\
  !*** ./js/AJAX.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = class AJAX {
  constructor(params) {
    this.name = "AJAX";
    
  }

  requestForPictures(classObj) {
    
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/pictureGet', true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.onload = function() {
        if (xhr.status == 200) {
          try {
  
            // promise resolve
            resolve(xhr.responseText);
          } catch (error) {
            console.log(error);
          }
        } else {
          throw new Error("Fail to execute request: " + xhr.status)
        }
      }
      xhr.send();
    })
    .then((info) => {
      classObj.pictureObj = JSON.parse(info); //pictureObj
    })
    .catch(error => {
      console.log(error);
    })

  }

  // request for comments
  requestForData(classObj) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/jsondata', true);
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      xhr.onload = function() {
        if (xhr.status == 200) {
          try {
            
            // promise resolve
            resolve(xhr.responseText);
          } catch (error) {
            console.log(error);
          }
        } else {
          throw new Error("Fail to execute request: " + xhr.status)
        }
      }
      xhr.send();
    })
    .then((info) => {
      classObj.commentsObj = JSON.parse(info); //commentsObj
    })
    .catch(error => {
      console.log(error);
    })

  }

  sendComments(json, f) {
    var self = this;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/json', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
  
        try {
          
          // handler
          f(xhr)
        } catch (error) {
          console.log(error);
        }
        
      }
    }
    xhr.send(json);
  }


}

/***/ }),

/***/ "./js/createGrid.js":
/*!**************************!*\
  !*** ./js/createGrid.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = class CreateGrid {
  constructor(options) {
    // map that shows how photos is set on grid 
    this.gridMap = [];

    this.UND = undefined;
    this.cellWidth = 236;
    this.cellHeight = 200;
    this.rowNum = 3;
    this.cellNum = 9999;

    this.css = {
      hoverElem: "hover-info",
      hoverInfoPics: "hover-info-pic-data",
      hoverComment: "hover-info__comment",
      hoverLike: "hover-info__like",
      hoverDislike: "hover-info__dislike",
      image: "image"
    }
  }

  setGridMapArr() {
    for (let i = 0; i < this.rowNum; i++) {
      this.gridMap.push(new Array(this.cellNum));
    }
  }

  createImageElement(value) {

    // add hover-element
    let hoverElem = document.createElement("div");
    hoverElem.className = this.css.hoverElem;
    hoverElem.innerHTML = `<div class="${this.css.hoverInfoPics} ${this.css.hoverComment}">` 
                          + '<img src="image/comment.png" alt="">'
                          + "<span class='statistics'>0</span>" 
                          + '</div>'  
                          + `<div class="${this.css.hoverInfoPics} ${this.css.hoverLike}">`
                          + '<img src="image/like.png" alt="">'
                          + "<span class='statistics'>0</span>"
                          + '</div>'
                          + `<div class="${this.css.hoverInfoPics} ${this.css.hoverDislike}">`
                          + '<img src="image/dislike.png" alt="">'
                          + "<span class='statistics'>0</span>"
                          + '</div>';
    //                      
    
    
    let img = document.createElement("div");
    img.className = this.css.image;
    img.appendChild(hoverElem);

    if (value == "h") {
      img.style.width = this.cellWidth + "px";
      img.style.height = this.cellHeight*2 + 10 + "px";
    } else if (value == "w") {

      img.style.width = this.cellWidth*2 + 10 + "px";
      img.style.height = this.cellHeight + "px";
    } else {

      img.style.width = this.cellWidth + "px";
      img.style.height = this.cellHeight + "px";
    }

    return img;
  }

  // gets the img height and width and than calculate the scale
  // set to img scale
  calcScale(img) {
    let w = 0, h = 0;
    h = img.naturalHeight;
    w = img.naturalWidth;
    
    if (w/h > 1.45) {
      if (w > this.cellWidth*2) {
        img.scale = "w";
      } 
    } else if (h/w > 1.45) {
        if (h > this.cellHeight*2) {
          img.scale = "h";
        } 
    } else {
      img.scale = "n";
    }    
  }

  // look for free space through the gridMap array
  findFreeSpace(value) {
      
    if (value == "h") {
      for (let i = 0; i < this.cellNum; i++) {
        if (this.gridMap[0][i] == this.UND && this.gridMap[1][i] == this.UND) {
          return {x: 0, y: i};
        } else if (this.gridMap[1][i] == this.UND && this.gridMap[2][i] == this.UND) {
          return {x: 1, y: i};
        } 
      }
  
    } else if (value == "w") {
      for (let i = 0; i < this.cellNum; i++) {
        if (this.gridMap[0][i] == this.UND && this.gridMap[0][i + 1] == this.UND) {
          return {x: 0, y: i};
        } else if (this.gridMap[1][i] == this.UND && this.gridMap[1][i + 1] == this.UND) {
          return {x: 1, y: i};
        } else if (this.gridMap[2][i] == this.UND && this.gridMap[2][i + 1] == this.UND) {
          return {x: 2, y: i};
        } 
      }
      
    } else {
      for (let i = 0; i < this.cellNum; i++) {
        if (this.gridMap[0][i] == this.UND) {
          return {x: 0, y: i};
        } else if (this.gridMap[1][i] == this.UND) {
          return {x: 1, y: i};
        } else if (this.gridMap[2][i] == this.UND) {
          return {x: 2, y: i};
        }
      }
    }
  }

  // set the position on the grid
  position(v, obj) {
    //определяем абсолютную позицию объекта и управляем отступами
    let x = v.x;
    let y = v.y;
    obj.style.position = "absolute";
    obj.style.top = this.cellHeight * x + x * 10 + "px";
    obj.style.left = this.cellWidth * y + y * 10 + "px";      
  }

  // create an obj in every image container
  insertData(DOMobj, img, classObj) {
    if (classObj.commentsObj[img.src]) {
      DOMobj.imageData = classObj.commentsObj[img.src];
    } else {
      DOMobj.imageData = [];
    }
  }

  // 
  setImage(img, classObj) { //передать картинку
      
    // применим calcScale для каждой картинки
    this.calcScale(img);
  
    // анализ масштаба, подгонка колонок и вставка картинки 
    switch (img.scale) {
     case "h": 
      
        let hp = this.findFreeSpace("h"); // p - position
        let hi = this.createImageElement("h"); // hi - high image (div elem)
        this.insertData(hi, img, classObj);
        this.position(hp, hi);
        hi.style.backgroundImage = `url(${img.src})`;
        hi.src = img.src; // для вывода в popup
        this.refreshInfoForSingleImage(hi);
  
        this.gridMap[hp.x][hp.y] = 1;
        this.gridMap[hp.x + 1][hp.y] = 1;

        return hi;
        break;
          
      case "w":  
        let wp = this.findFreeSpace("w"); // p - position
        let wi = this.createImageElement("w"); // wi - wide image
        this.insertData(wi, img, classObj);
        this.position(wp, wi);
        wi.style.backgroundImage = `url(${img.src})`;
        wi.src = img.src;
        this.refreshInfoForSingleImage(wi);
        this.gridMap[wp.x][wp.y] = 1;
        this.gridMap[wp.x][wp.y + 1] = 1;
        return wi;
        break;
  
      default:
        let sp = this.findFreeSpace("n"); // p - position
        let si = this.createImageElement("s"); // si - small image
        this.insertData(si, img, classObj);
        this.position(sp, si);
        si.style.backgroundImage = `url(${img.src})`;
        si.src = img.src;
        this.refreshInfoForSingleImage(si);
        this.gridMap[sp.x][sp.y] = 1;
        return si;
        
    } 
  }


  // 
  setToGrid(f, fefreshInfo, classObj) { 
    var self = this;
    for (let i = 0; i < classObj.pictureObj.length; i++) {
      new Promise((resolve, reject) => {
        let img = new Image();
        img.src = classObj.pictureObj[i];
        img.onload = () => {
          resolve(img)
        }
      })
      .then((img) => {
        var elem = self.setImage(img, classObj);
        classObj.container.appendChild(elem);
        classObj.container.quantity++;
        fefreshInfo(elem, classObj);
        if (classObj.container.quantity == classObj.pictureObj.length) {
          // for future oppurtunity to add photos
          f && f("done!");
        }
      })
      .catch(error => {
        console.log(error);
      })
      
      
    }
  }

  refreshInfoForSingleImage(obj, classObj) {

    let commentData = obj.children[0].children[0].children[1];
    let dislikeData = obj.children[0].children[2].children[1];
    let likeData = obj.children[0].children[1].children[1];
  
    let likeStat = 0;
    let dislikeStat = 0;
  
    //obj.likeStat = likeStat;
    //obj.dislikeStat = dislikeStat;
  
    
    if (obj.imageData) {
      // comments
      let commStat = obj.imageData.length;
      commentData.innerText = commStat;
  
      // likes / dislikes
      for (let i = 0; i < obj.imageData.length; i++) {
        
        if (obj.imageData[i].like == 1) {
          likeStat++;
        } else if (obj.imageData[i].like == -1) {
          dislikeStat++;
        }
      }
  
      obj.likeStat = likeStat;
      obj.dislikeStat = dislikeStat;
  
       
      dislikeData.innerText = dislikeStat;
      likeData.innerText = likeStat;
    }
  }
}

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const multiInherit = __webpack_require__(/*! ./multi-inheritance */ "./js/multi-inheritance.js");
let AJAX = __webpack_require__(/*! ./AJAX */ "./js/AJAX.js");
let CREATE_GRID = __webpack_require__(/*! ./createGrid */ "./js/createGrid.js");
let POPUP_WINDOW = __webpack_require__(/*! ./popupWindow */ "./js/popupWindow.js");

__webpack_require__(/*! ../css/style.css */ "./css/style.css");

class VariablesAndCommonFunctions {
  constructor(options) {

    this.commentsObj = {};
    this.pictureObj = [];
    this.iconsObj = [];
  }

  findDivElem(src, css) {
    let div = document.querySelectorAll(`.${css}`);
    for (let i = 0; i < div.length; i++) {
      let source = div[i].style.backgroundImage.slice(5, -2);
      if (source == src) return div[i];
    }
  }

  createStringDate() {
    let time = new Date();
    let date = time.getDate() < 10 ? "0" + time.getDate() : time.getDate();
    let month = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1;
    let hour = time.getHours() + 1 < 10 ? "0" + time.getHours() : time.getHours();
    let minute = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
    time = date + "." + month + "." + time.getFullYear()
          + " " + hour + ":" + minute;

    return time;
  }
}
VariablesAndCommonFunctions.container = document.querySelector(".image-gallery");

VariablesAndCommonFunctions.container.quantity = 0;
VariablesAndCommonFunctions.ico = document.querySelectorAll(".ico > img");
VariablesAndCommonFunctions.popup = document.querySelector(".popup");
VariablesAndCommonFunctions.close = document.getElementById("close-btn");
VariablesAndCommonFunctions.popupPic = document.getElementById("popup-pic");
VariablesAndCommonFunctions.popupBg = document.querySelector(".popup-bg");
VariablesAndCommonFunctions.like = document.querySelector(".like");
VariablesAndCommonFunctions.dislike = document.querySelector(".dislike");
VariablesAndCommonFunctions.commentWindow = document.querySelector(".comments-window")
VariablesAndCommonFunctions.uploadWindow = document.querySelector(".upload-pic");

VariablesAndCommonFunctions.popupLikeStat = document.querySelector(".popup-like-stat");
VariablesAndCommonFunctions.popupDisikeStat = document.querySelector(".popup-dislike-stat");
VariablesAndCommonFunctions.popupCommentStat = document.querySelector(".popup__comments-quantity");

VariablesAndCommonFunctions.form = document.querySelector(".send-comment");
VariablesAndCommonFunctions.formSubmit = document.querySelector(".send-comment button");


// create class with AJAX requests
class AJAX_requests extends multiInherit.inherit(AJAX, VariablesAndCommonFunctions) {
  constructor(params) {
    super();
  }
}

// create class to create grid
class CreateGrid extends multiInherit.inherit(CREATE_GRID, VariablesAndCommonFunctions) {
  constructor(params) {
    super();
  }
}

// create class to create popup window functionality
class PopupWindow extends multiInherit.inherit(POPUP_WINDOW, VariablesAndCommonFunctions) {
  constructor(params) {
    super();
  }
}


let req = new AJAX_requests();
let gridCreating = new CreateGrid();
let windowPopup = new PopupWindow();

function createGallery() {
  return Promise.all([
    req.requestForPictures(VariablesAndCommonFunctions),
    req.requestForData(VariablesAndCommonFunctions)
  ])
  .then(() => {
    gridCreating.setGridMapArr();
    gridCreating.setToGrid('', gridCreating.refreshInfoForSingleImage, VariablesAndCommonFunctions);
    windowPopup.addEventsOnButtons(VariablesAndCommonFunctions, req.sendComments, gridCreating.refreshInfoForSingleImage);
    
  })
  .catch((error) => {
    console.log(error);
  })
}


exports.VariablesAndCommonFunctions = VariablesAndCommonFunctions;
exports.req = req;
exports.gridCreating = gridCreating;
exports.windowPopup = windowPopup;


createGallery();

console.log("started");









/***/ }),

/***/ "./js/multi-inheritance.js":
/*!*********************************!*\
  !*** ./js/multi-inheritance.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Class for creating multi inheritance.
module.exports = class multi {
	// Inherit method to create base classes.
	static inherit(..._bases)
	{
		class classes {

			// The base classes
  			get base() { return _bases; }

			constructor(..._args)
			{
				var index = 0;

				for (let b of this.base) 
				{
					let obj = new b(_args[index++]);
   					multi.copy(this, obj);
				}
			}
		
		}

		// Copy over properties and methods
		for (let base of _bases) 
		{
   			multi.copy(classes, base);
   			multi.copy(classes.prototype, base.prototype);
		}

		return classes;
	}

	// Copies the properties from one class to another
	static copy(_target, _source) 
	{
    		for (let key of Reflect.ownKeys(_source)) 
			{
        		if (key !== "constructor" && key !== "prototype" && key !== "name") 
				{
	        	    let desc = Object.getOwnPropertyDescriptor(_source, key);
	        	    Object.defineProperty(_target, key, desc);
        		}
    		}
	}
}

/***/ }),

/***/ "./js/popupWindow.js":
/*!***************************!*\
  !*** ./js/popupWindow.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = class PopupWindow {
  constructor(options) {

    this.css = {
      image: "image",
      popupStat: "popup-stat",
      likeBtnActive: "like_active",
      dislikeBtnActive: "dislike_active",
      show: "show",
      showFlex: "show-flex"
    }

    var self = this;
  }

  addEventsOnButtons(classObj, req, refresh) {
    var self = this;

    // bind to every anonymous handler needed context
    classObj.like.addEventListener("click", function(e) {
      classObj.like.children[0].src = "image/like-active.png";
      classObj.like.classList.add(`${this.css.likeBtnActive}`);
      classObj.dislike.classList.remove(`${this.css.dislikeBtnActive}`);
    
      let img = this.findDivElem(classObj.popupPic.src, this.css.image);
    
      if (img.like == -1) {
        document.querySelectorAll(`.${this.css.popupStat}`)[0].innerText = img.likeStat + 1;
        document.querySelectorAll(`.${this.css.popupStat}`)[1].innerText = img.dislikeStat;
        classObj.dislike.children[0].src = "image/dislike.png"
      } else {
        document.querySelectorAll(`.${this.css.popupStat}`)[0].innerText = img.likeStat + 1;
      }
      img.like = 1;
    }.bind(self));

    classObj.dislike.addEventListener("click", function(e) {
      classObj.dislike.children[0].src = "image/dislike-active.png";
      classObj.dislike.classList.add(`${this.css.dislikeBtnActive}`);
      classObj.like.classList.remove(`${this.css.likeBtnActive}`);
    
      let img = this.findDivElem(classObj.popupPic.src, this.css.image);
    
      if (img.like == 1) {
        document.querySelectorAll(`.${this.css.popupStat}`)[0].innerText = img.likeStat;
        document.querySelectorAll(`.${this.css.popupStat}`)[1].innerText = img.dislikeStat + 1;
        classObj.like.children[0].src = "image/like.png"
      } else {
        document.querySelectorAll(`.${this.css.popupStat}`)[1].innerText = img.dislikeStat + 1;
      }
      img.like = -1;
    }.bind(self));

    classObj.container.addEventListener("click", function(e) {
      let w = window.innerWidth;
      let h = window.innerHeight;
      let source = e.target.src;

      if (e.target.className == this.css.image) {
        
        classObj.popupBg.classList.add(`${this.css.show}`);
        classObj.popup.classList.add(`${this.css.showFlex}`);
        classObj.popup.style.left = (w - 810)/2 + "px"; // рассчитываем отступ для центрирования popup
        classObj.popup.style.top = (h - 590)/2 + "px"; // рассчитываем отступ сверху для центрирования popup
        classObj.popup.children[0].children[0].src = source;
        this.refreshInfoForPopup(classObj.popup, classObj);
      } 
    }.bind(self));

    window.addEventListener("click", function(e) {
      
      if (e.target.classList.contains("close-btn") || e.target.classList.contains("popup-bg")) {
        classObj.popupBg.classList.remove(`${this.css.show}`);
        classObj.popup.classList.remove(`${this.css.showFlex}`);
    
        try {
          this.clearInfo(classObj);
          this.standartLikeDislike(this.findDivElem(classObj.popupPic.src, this.css.image), classObj);
        } catch(e) {
          console.log(e);
        }

      } 
    }.bind(self));

    classObj.formSubmit.addEventListener("click", function() {
      this.commentsRequest(req, refresh, classObj);
    }.bind(self))
  }



  refreshInfoForPopup(pop, classObj) {

    let key = pop.children[0].children[0].src;
    let img = this.findDivElem(key, this.css.image);
    if (img.imageData) {
  
      // удаляем комменты
      this.clearInfo(classObj);
  
      // comments
      let commStat = img.imageData.length;
      
      classObj.popupCommentStat.innerText = commStat;
  
      // показываем комменты
      this.showComments(img.imageData, classObj);
  
      classObj.popupLikeStat.innerText = img.likeStat;
      classObj.popupDisikeStat.innerText = img.dislikeStat;
    } 
  }


  commentsRequest(req, refresh, classObj) {

    let nickName = classObj.form.children[0].value;
    let comment = classObj.form.children[1].value;
  
    if (nickName == "" || comment == "") return alert("Enter your name or comment");
  
    let imageName = classObj.popupPic.src;
    let img = this.findDivElem(imageName, this.css.image);
    
    let liked = img.like == undefined ? 0 : img.like;
  
    // очистка значений формы
    classObj.form.children[0].value = "";
    classObj.form.children[1].value = "";
  
    // установка времени
    let time = this.createStringDate();

  
    let json = JSON.stringify({
      [imageName]: {
        nick: nickName,
        comm: comment,
        date: time,
        like: liked
      }
    });
  
    // поиск картинки и присвоение ей данных
    img.imageData.push({
      nick: nickName,
      comm: comment,
      date: time,
      like: liked
    })
    
    this.standartLikeDislike(img, classObj);
    
    req(json, function(xhr) {
      try {
        classObj.commentsObj = JSON.parse(xhr.responseText);
        img.likeStat = classObj.popupLikeStat.innerText;
        img.dislikeStat = classObj.popupDisikeStat.innerText;
        this.refreshInfoForPopup(classObj.popup, classObj);
        refresh(img);
      } catch (error) {
        console.log(error);
      }
    }.bind(this))
   
  
  }
  
  
  standartLikeDislike(obj, classObj) {
    classObj.dislike.classList.remove(`${this.css.dislikeBtnActive}`);
    classObj.like.classList.remove(`${this.css.likeBtnActive}`);
    classObj.dislike.children[0].src = "image/dislike.png";
    classObj.like.children[0].src = "image/like.png"
    obj.like = 0;
  }
  
  
  // показать комментарии, лайки во время загрузки страницы
  showComments(value, classObj) {
    let dateNameRow = document.createElement("tr");
    let commRow = document.createElement("tr");
  
    for (let i = 0; i < value.length; i++) {
  
      dateNameRow.innerHTML = "<td><div></div></td><td><div></div></td>";
      
      dateNameRow.children[0].children[0].innerText = "By " + value[i].nick;
      dateNameRow.children[1].children[0].innerText = value[i].date;
      dateNameRow.className = "inner-comment-above"; 
      
      commRow.innerHTML = "<td colspan='2'><div></div></td>";
      commRow.children[0].children[0].innerText = value[i].comm;
      commRow.className = "inner-comment";
  
      classObj.commentWindow.appendChild(dateNameRow.cloneNode(true));
      classObj.commentWindow.appendChild(commRow.cloneNode(true));
    }
  }
  
  // clear all fields in popup window
  clearInfo(classObj) {
    classObj.commentWindow.innerHTML = "";
    classObj.popupCommentStat.innerText = 0;
    classObj.popupLikeStat.innerText = 0;
    classObj.popupDisikeStat.innerText = 0;
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYWxsL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dhbGwvLi9jc3Mvc3R5bGUuY3NzIiwid2VicGFjazovL2dhbGwvLi9qcy9BSkFYLmpzIiwid2VicGFjazovL2dhbGwvLi9qcy9jcmVhdGVHcmlkLmpzIiwid2VicGFjazovL2dhbGwvLi9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly9nYWxsLy4vanMvbXVsdGktaW5oZXJpdGFuY2UuanMiLCJ3ZWJwYWNrOi8vZ2FsbC8uL2pzL3BvcHVwV2luZG93LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkVBLHlDOzs7Ozs7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLDZDQUE2QztBQUM3QyxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZE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Q0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsa0JBQWtCOztBQUVyQzs7QUFFQTtBQUNBO0FBQ0Esb0Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiJzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9qcy9pbmRleC5qc1wiKTtcbiIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luIiwibW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBBSkFYIHtcclxuICBjb25zdHJ1Y3RvcihwYXJhbXMpIHtcclxuICAgIHRoaXMubmFtZSA9IFwiQUpBWFwiO1xyXG4gICAgXHJcbiAgfVxyXG5cclxuICByZXF1ZXN0Rm9yUGljdHVyZXMoY2xhc3NPYmopIHtcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgIHhoci5vcGVuKCdQT1NUJywgJy9waWN0dXJlR2V0JywgdHJ1ZSk7XHJcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xyXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gIFxyXG4gICAgICAgICAgICAvLyBwcm9taXNlIHJlc29sdmVcclxuICAgICAgICAgICAgcmVzb2x2ZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRmFpbCB0byBleGVjdXRlIHJlcXVlc3Q6IFwiICsgeGhyLnN0YXR1cylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgeGhyLnNlbmQoKTtcclxuICAgIH0pXHJcbiAgICAudGhlbigoaW5mbykgPT4ge1xyXG4gICAgICBjbGFzc09iai5waWN0dXJlT2JqID0gSlNPTi5wYXJzZShpbmZvKTsgLy9waWN0dXJlT2JqXHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSlcclxuXHJcbiAgfVxyXG5cclxuICAvLyByZXF1ZXN0IGZvciBjb21tZW50c1xyXG4gIHJlcXVlc3RGb3JEYXRhKGNsYXNzT2JqKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgeGhyLm9wZW4oJ1BPU1QnLCAnL2pzb25kYXRhJywgdHJ1ZSk7XHJcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xyXG4gICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gcHJvbWlzZSByZXNvbHZlXHJcbiAgICAgICAgICAgIHJlc29sdmUoeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkZhaWwgdG8gZXhlY3V0ZSByZXF1ZXN0OiBcIiArIHhoci5zdGF0dXMpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9KVxyXG4gICAgLnRoZW4oKGluZm8pID0+IHtcclxuICAgICAgY2xhc3NPYmouY29tbWVudHNPYmogPSBKU09OLnBhcnNlKGluZm8pOyAvL2NvbW1lbnRzT2JqXHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gICAgfSlcclxuXHJcbiAgfVxyXG5cclxuICBzZW5kQ29tbWVudHMoanNvbiwgZikge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgeGhyLm9wZW4oJ1BPU1QnLCAnL2pzb24nLCB0cnVlKTtcclxuICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xyXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCkge1xyXG4gIFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBcclxuICAgICAgICAgIC8vIGhhbmRsZXJcclxuICAgICAgICAgIGYoeGhyKVxyXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICB4aHIuc2VuZChqc29uKTtcclxuICB9XHJcblxyXG5cclxufSIsIm1vZHVsZS5leHBvcnRzID0gY2xhc3MgQ3JlYXRlR3JpZCB7XHJcbiAgY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgLy8gbWFwIHRoYXQgc2hvd3MgaG93IHBob3RvcyBpcyBzZXQgb24gZ3JpZCBcclxuICAgIHRoaXMuZ3JpZE1hcCA9IFtdO1xyXG5cclxuICAgIHRoaXMuVU5EID0gdW5kZWZpbmVkO1xyXG4gICAgdGhpcy5jZWxsV2lkdGggPSAyMzY7XHJcbiAgICB0aGlzLmNlbGxIZWlnaHQgPSAyMDA7XHJcbiAgICB0aGlzLnJvd051bSA9IDM7XHJcbiAgICB0aGlzLmNlbGxOdW0gPSA5OTk5O1xyXG5cclxuICAgIHRoaXMuY3NzID0ge1xyXG4gICAgICBob3ZlckVsZW06IFwiaG92ZXItaW5mb1wiLFxyXG4gICAgICBob3ZlckluZm9QaWNzOiBcImhvdmVyLWluZm8tcGljLWRhdGFcIixcclxuICAgICAgaG92ZXJDb21tZW50OiBcImhvdmVyLWluZm9fX2NvbW1lbnRcIixcclxuICAgICAgaG92ZXJMaWtlOiBcImhvdmVyLWluZm9fX2xpa2VcIixcclxuICAgICAgaG92ZXJEaXNsaWtlOiBcImhvdmVyLWluZm9fX2Rpc2xpa2VcIixcclxuICAgICAgaW1hZ2U6IFwiaW1hZ2VcIlxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0R3JpZE1hcEFycigpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dOdW07IGkrKykge1xyXG4gICAgICB0aGlzLmdyaWRNYXAucHVzaChuZXcgQXJyYXkodGhpcy5jZWxsTnVtKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjcmVhdGVJbWFnZUVsZW1lbnQodmFsdWUpIHtcclxuXHJcbiAgICAvLyBhZGQgaG92ZXItZWxlbWVudFxyXG4gICAgbGV0IGhvdmVyRWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBob3ZlckVsZW0uY2xhc3NOYW1lID0gdGhpcy5jc3MuaG92ZXJFbGVtO1xyXG4gICAgaG92ZXJFbGVtLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiJHt0aGlzLmNzcy5ob3ZlckluZm9QaWNzfSAke3RoaXMuY3NzLmhvdmVyQ29tbWVudH1cIj5gIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgJzxpbWcgc3JjPVwiaW1hZ2UvY29tbWVudC5wbmdcIiBhbHQ9XCJcIj4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyBcIjxzcGFuIGNsYXNzPSdzdGF0aXN0aWNzJz4wPC9zcGFuPlwiIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgJzwvZGl2PicgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgYDxkaXYgY2xhc3M9XCIke3RoaXMuY3NzLmhvdmVySW5mb1BpY3N9ICR7dGhpcy5jc3MuaG92ZXJMaWtlfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArICc8aW1nIHNyYz1cImltYWdlL2xpa2UucG5nXCIgYWx0PVwiXCI+J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgXCI8c3BhbiBjbGFzcz0nc3RhdGlzdGljcyc+MDwvc3Bhbj5cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICsgJzwvZGl2PidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIGA8ZGl2IGNsYXNzPVwiJHt0aGlzLmNzcy5ob3ZlckluZm9QaWNzfSAke3RoaXMuY3NzLmhvdmVyRGlzbGlrZX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKyAnPGltZyBzcmM9XCJpbWFnZS9kaXNsaWtlLnBuZ1wiIGFsdD1cIlwiPidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiPHNwYW4gY2xhc3M9J3N0YXRpc3RpY3MnPjA8L3NwYW4+XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICArICc8L2Rpdj4nO1xyXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBpbWcuY2xhc3NOYW1lID0gdGhpcy5jc3MuaW1hZ2U7XHJcbiAgICBpbWcuYXBwZW5kQ2hpbGQoaG92ZXJFbGVtKTtcclxuXHJcbiAgICBpZiAodmFsdWUgPT0gXCJoXCIpIHtcclxuICAgICAgaW1nLnN0eWxlLndpZHRoID0gdGhpcy5jZWxsV2lkdGggKyBcInB4XCI7XHJcbiAgICAgIGltZy5zdHlsZS5oZWlnaHQgPSB0aGlzLmNlbGxIZWlnaHQqMiArIDEwICsgXCJweFwiO1xyXG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PSBcIndcIikge1xyXG5cclxuICAgICAgaW1nLnN0eWxlLndpZHRoID0gdGhpcy5jZWxsV2lkdGgqMiArIDEwICsgXCJweFwiO1xyXG4gICAgICBpbWcuc3R5bGUuaGVpZ2h0ID0gdGhpcy5jZWxsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgIGltZy5zdHlsZS53aWR0aCA9IHRoaXMuY2VsbFdpZHRoICsgXCJweFwiO1xyXG4gICAgICBpbWcuc3R5bGUuaGVpZ2h0ID0gdGhpcy5jZWxsSGVpZ2h0ICsgXCJweFwiO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpbWc7XHJcbiAgfVxyXG5cclxuICAvLyBnZXRzIHRoZSBpbWcgaGVpZ2h0IGFuZCB3aWR0aCBhbmQgdGhhbiBjYWxjdWxhdGUgdGhlIHNjYWxlXHJcbiAgLy8gc2V0IHRvIGltZyBzY2FsZVxyXG4gIGNhbGNTY2FsZShpbWcpIHtcclxuICAgIGxldCB3ID0gMCwgaCA9IDA7XHJcbiAgICBoID0gaW1nLm5hdHVyYWxIZWlnaHQ7XHJcbiAgICB3ID0gaW1nLm5hdHVyYWxXaWR0aDtcclxuICAgIFxyXG4gICAgaWYgKHcvaCA+IDEuNDUpIHtcclxuICAgICAgaWYgKHcgPiB0aGlzLmNlbGxXaWR0aCoyKSB7XHJcbiAgICAgICAgaW1nLnNjYWxlID0gXCJ3XCI7XHJcbiAgICAgIH0gXHJcbiAgICB9IGVsc2UgaWYgKGgvdyA+IDEuNDUpIHtcclxuICAgICAgICBpZiAoaCA+IHRoaXMuY2VsbEhlaWdodCoyKSB7XHJcbiAgICAgICAgICBpbWcuc2NhbGUgPSBcImhcIjtcclxuICAgICAgICB9IFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW1nLnNjYWxlID0gXCJuXCI7XHJcbiAgICB9ICAgIFxyXG4gIH1cclxuXHJcbiAgLy8gbG9vayBmb3IgZnJlZSBzcGFjZSB0aHJvdWdoIHRoZSBncmlkTWFwIGFycmF5XHJcbiAgZmluZEZyZWVTcGFjZSh2YWx1ZSkge1xyXG4gICAgICBcclxuICAgIGlmICh2YWx1ZSA9PSBcImhcIikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY2VsbE51bTsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ3JpZE1hcFswXVtpXSA9PSB0aGlzLlVORCAmJiB0aGlzLmdyaWRNYXBbMV1baV0gPT0gdGhpcy5VTkQpIHtcclxuICAgICAgICAgIHJldHVybiB7eDogMCwgeTogaX07XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdyaWRNYXBbMV1baV0gPT0gdGhpcy5VTkQgJiYgdGhpcy5ncmlkTWFwWzJdW2ldID09IHRoaXMuVU5EKSB7XHJcbiAgICAgICAgICByZXR1cm4ge3g6IDEsIHk6IGl9O1xyXG4gICAgICAgIH0gXHJcbiAgICAgIH1cclxuICBcclxuICAgIH0gZWxzZSBpZiAodmFsdWUgPT0gXCJ3XCIpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNlbGxOdW07IGkrKykge1xyXG4gICAgICAgIGlmICh0aGlzLmdyaWRNYXBbMF1baV0gPT0gdGhpcy5VTkQgJiYgdGhpcy5ncmlkTWFwWzBdW2kgKyAxXSA9PSB0aGlzLlVORCkge1xyXG4gICAgICAgICAgcmV0dXJuIHt4OiAwLCB5OiBpfTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZ3JpZE1hcFsxXVtpXSA9PSB0aGlzLlVORCAmJiB0aGlzLmdyaWRNYXBbMV1baSArIDFdID09IHRoaXMuVU5EKSB7XHJcbiAgICAgICAgICByZXR1cm4ge3g6IDEsIHk6IGl9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ncmlkTWFwWzJdW2ldID09IHRoaXMuVU5EICYmIHRoaXMuZ3JpZE1hcFsyXVtpICsgMV0gPT0gdGhpcy5VTkQpIHtcclxuICAgICAgICAgIHJldHVybiB7eDogMiwgeTogaX07XHJcbiAgICAgICAgfSBcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jZWxsTnVtOyBpKyspIHtcclxuICAgICAgICBpZiAodGhpcy5ncmlkTWFwWzBdW2ldID09IHRoaXMuVU5EKSB7XHJcbiAgICAgICAgICByZXR1cm4ge3g6IDAsIHk6IGl9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ncmlkTWFwWzFdW2ldID09IHRoaXMuVU5EKSB7XHJcbiAgICAgICAgICByZXR1cm4ge3g6IDEsIHk6IGl9O1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5ncmlkTWFwWzJdW2ldID09IHRoaXMuVU5EKSB7XHJcbiAgICAgICAgICByZXR1cm4ge3g6IDIsIHk6IGl9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gc2V0IHRoZSBwb3NpdGlvbiBvbiB0aGUgZ3JpZFxyXG4gIHBvc2l0aW9uKHYsIG9iaikge1xyXG4gICAgLy/QvtC/0YDQtdC00LXQu9GP0LXQvCDQsNCx0YHQvtC70Y7RgtC90YPRjiDQv9C+0LfQuNGG0LjRjiDQvtCx0YrQtdC60YLQsCDQuCDRg9C/0YDQsNCy0LvRj9C10Lwg0L7RgtGB0YLRg9C/0LDQvNC4XHJcbiAgICBsZXQgeCA9IHYueDtcclxuICAgIGxldCB5ID0gdi55O1xyXG4gICAgb2JqLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xyXG4gICAgb2JqLnN0eWxlLnRvcCA9IHRoaXMuY2VsbEhlaWdodCAqIHggKyB4ICogMTAgKyBcInB4XCI7XHJcbiAgICBvYmouc3R5bGUubGVmdCA9IHRoaXMuY2VsbFdpZHRoICogeSArIHkgKiAxMCArIFwicHhcIjsgICAgICBcclxuICB9XHJcblxyXG4gIC8vIGNyZWF0ZSBhbiBvYmogaW4gZXZlcnkgaW1hZ2UgY29udGFpbmVyXHJcbiAgaW5zZXJ0RGF0YShET01vYmosIGltZywgY2xhc3NPYmopIHtcclxuICAgIGlmIChjbGFzc09iai5jb21tZW50c09ialtpbWcuc3JjXSkge1xyXG4gICAgICBET01vYmouaW1hZ2VEYXRhID0gY2xhc3NPYmouY29tbWVudHNPYmpbaW1nLnNyY107XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBET01vYmouaW1hZ2VEYXRhID0gW107XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBcclxuICBzZXRJbWFnZShpbWcsIGNsYXNzT2JqKSB7IC8v0L/QtdGA0LXQtNCw0YLRjCDQutCw0YDRgtC40L3QutGDXHJcbiAgICAgIFxyXG4gICAgLy8g0L/RgNC40LzQtdC90LjQvCBjYWxjU2NhbGUg0LTQu9GPINC60LDQttC00L7QuSDQutCw0YDRgtC40L3QutC4XHJcbiAgICB0aGlzLmNhbGNTY2FsZShpbWcpO1xyXG4gIFxyXG4gICAgLy8g0LDQvdCw0LvQuNC3INC80LDRgdGI0YLQsNCx0LAsINC/0L7QtNCz0L7QvdC60LAg0LrQvtC70L7QvdC+0Log0Lgg0LLRgdGC0LDQstC60LAg0LrQsNGA0YLQuNC90LrQuCBcclxuICAgIHN3aXRjaCAoaW1nLnNjYWxlKSB7XHJcbiAgICAgY2FzZSBcImhcIjogXHJcbiAgICAgIFxyXG4gICAgICAgIGxldCBocCA9IHRoaXMuZmluZEZyZWVTcGFjZShcImhcIik7IC8vIHAgLSBwb3NpdGlvblxyXG4gICAgICAgIGxldCBoaSA9IHRoaXMuY3JlYXRlSW1hZ2VFbGVtZW50KFwiaFwiKTsgLy8gaGkgLSBoaWdoIGltYWdlIChkaXYgZWxlbSlcclxuICAgICAgICB0aGlzLmluc2VydERhdGEoaGksIGltZywgY2xhc3NPYmopO1xyXG4gICAgICAgIHRoaXMucG9zaXRpb24oaHAsIGhpKTtcclxuICAgICAgICBoaS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKCR7aW1nLnNyY30pYDtcclxuICAgICAgICBoaS5zcmMgPSBpbWcuc3JjOyAvLyDQtNC70Y8g0LLRi9Cy0L7QtNCwINCyIHBvcHVwXHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSW5mb0ZvclNpbmdsZUltYWdlKGhpKTtcclxuICBcclxuICAgICAgICB0aGlzLmdyaWRNYXBbaHAueF1baHAueV0gPSAxO1xyXG4gICAgICAgIHRoaXMuZ3JpZE1hcFtocC54ICsgMV1baHAueV0gPSAxO1xyXG5cclxuICAgICAgICByZXR1cm4gaGk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICBcclxuICAgICAgY2FzZSBcIndcIjogIFxyXG4gICAgICAgIGxldCB3cCA9IHRoaXMuZmluZEZyZWVTcGFjZShcIndcIik7IC8vIHAgLSBwb3NpdGlvblxyXG4gICAgICAgIGxldCB3aSA9IHRoaXMuY3JlYXRlSW1hZ2VFbGVtZW50KFwid1wiKTsgLy8gd2kgLSB3aWRlIGltYWdlXHJcbiAgICAgICAgdGhpcy5pbnNlcnREYXRhKHdpLCBpbWcsIGNsYXNzT2JqKTtcclxuICAgICAgICB0aGlzLnBvc2l0aW9uKHdwLCB3aSk7XHJcbiAgICAgICAgd2kuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybCgke2ltZy5zcmN9KWA7XHJcbiAgICAgICAgd2kuc3JjID0gaW1nLnNyYztcclxuICAgICAgICB0aGlzLnJlZnJlc2hJbmZvRm9yU2luZ2xlSW1hZ2Uod2kpO1xyXG4gICAgICAgIHRoaXMuZ3JpZE1hcFt3cC54XVt3cC55XSA9IDE7XHJcbiAgICAgICAgdGhpcy5ncmlkTWFwW3dwLnhdW3dwLnkgKyAxXSA9IDE7XHJcbiAgICAgICAgcmV0dXJuIHdpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gIFxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIGxldCBzcCA9IHRoaXMuZmluZEZyZWVTcGFjZShcIm5cIik7IC8vIHAgLSBwb3NpdGlvblxyXG4gICAgICAgIGxldCBzaSA9IHRoaXMuY3JlYXRlSW1hZ2VFbGVtZW50KFwic1wiKTsgLy8gc2kgLSBzbWFsbCBpbWFnZVxyXG4gICAgICAgIHRoaXMuaW5zZXJ0RGF0YShzaSwgaW1nLCBjbGFzc09iaik7XHJcbiAgICAgICAgdGhpcy5wb3NpdGlvbihzcCwgc2kpO1xyXG4gICAgICAgIHNpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWcuc3JjfSlgO1xyXG4gICAgICAgIHNpLnNyYyA9IGltZy5zcmM7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoSW5mb0ZvclNpbmdsZUltYWdlKHNpKTtcclxuICAgICAgICB0aGlzLmdyaWRNYXBbc3AueF1bc3AueV0gPSAxO1xyXG4gICAgICAgIHJldHVybiBzaTtcclxuICAgICAgICBcclxuICAgIH0gXHJcbiAgfVxyXG5cclxuXHJcbiAgLy8gXHJcbiAgc2V0VG9HcmlkKGYsIGZlZnJlc2hJbmZvLCBjbGFzc09iaikgeyBcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3NPYmoucGljdHVyZU9iai5sZW5ndGg7IGkrKykge1xyXG4gICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGltZy5zcmMgPSBjbGFzc09iai5waWN0dXJlT2JqW2ldO1xyXG4gICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICByZXNvbHZlKGltZylcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICAgIC50aGVuKChpbWcpID0+IHtcclxuICAgICAgICB2YXIgZWxlbSA9IHNlbGYuc2V0SW1hZ2UoaW1nLCBjbGFzc09iaik7XHJcbiAgICAgICAgY2xhc3NPYmouY29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW0pO1xyXG4gICAgICAgIGNsYXNzT2JqLmNvbnRhaW5lci5xdWFudGl0eSsrO1xyXG4gICAgICAgIGZlZnJlc2hJbmZvKGVsZW0sIGNsYXNzT2JqKTtcclxuICAgICAgICBpZiAoY2xhc3NPYmouY29udGFpbmVyLnF1YW50aXR5ID09IGNsYXNzT2JqLnBpY3R1cmVPYmoubGVuZ3RoKSB7XHJcbiAgICAgICAgICAvLyBmb3IgZnV0dXJlIG9wcHVydHVuaXR5IHRvIGFkZCBwaG90b3NcclxuICAgICAgICAgIGYgJiYgZihcImRvbmUhXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKGVycm9yID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pXHJcbiAgICAgIFxyXG4gICAgICBcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJlZnJlc2hJbmZvRm9yU2luZ2xlSW1hZ2Uob2JqLCBjbGFzc09iaikge1xyXG5cclxuICAgIGxldCBjb21tZW50RGF0YSA9IG9iai5jaGlsZHJlblswXS5jaGlsZHJlblswXS5jaGlsZHJlblsxXTtcclxuICAgIGxldCBkaXNsaWtlRGF0YSA9IG9iai5jaGlsZHJlblswXS5jaGlsZHJlblsyXS5jaGlsZHJlblsxXTtcclxuICAgIGxldCBsaWtlRGF0YSA9IG9iai5jaGlsZHJlblswXS5jaGlsZHJlblsxXS5jaGlsZHJlblsxXTtcclxuICBcclxuICAgIGxldCBsaWtlU3RhdCA9IDA7XHJcbiAgICBsZXQgZGlzbGlrZVN0YXQgPSAwO1xyXG4gIFxyXG4gICAgLy9vYmoubGlrZVN0YXQgPSBsaWtlU3RhdDtcclxuICAgIC8vb2JqLmRpc2xpa2VTdGF0ID0gZGlzbGlrZVN0YXQ7XHJcbiAgXHJcbiAgICBcclxuICAgIGlmIChvYmouaW1hZ2VEYXRhKSB7XHJcbiAgICAgIC8vIGNvbW1lbnRzXHJcbiAgICAgIGxldCBjb21tU3RhdCA9IG9iai5pbWFnZURhdGEubGVuZ3RoO1xyXG4gICAgICBjb21tZW50RGF0YS5pbm5lclRleHQgPSBjb21tU3RhdDtcclxuICBcclxuICAgICAgLy8gbGlrZXMgLyBkaXNsaWtlc1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5pbWFnZURhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBcclxuICAgICAgICBpZiAob2JqLmltYWdlRGF0YVtpXS5saWtlID09IDEpIHtcclxuICAgICAgICAgIGxpa2VTdGF0Kys7XHJcbiAgICAgICAgfSBlbHNlIGlmIChvYmouaW1hZ2VEYXRhW2ldLmxpa2UgPT0gLTEpIHtcclxuICAgICAgICAgIGRpc2xpa2VTdGF0Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIG9iai5saWtlU3RhdCA9IGxpa2VTdGF0O1xyXG4gICAgICBvYmouZGlzbGlrZVN0YXQgPSBkaXNsaWtlU3RhdDtcclxuICBcclxuICAgICAgIFxyXG4gICAgICBkaXNsaWtlRGF0YS5pbm5lclRleHQgPSBkaXNsaWtlU3RhdDtcclxuICAgICAgbGlrZURhdGEuaW5uZXJUZXh0ID0gbGlrZVN0YXQ7XHJcbiAgICB9XHJcbiAgfVxyXG59IiwiY29uc3QgbXVsdGlJbmhlcml0ID0gcmVxdWlyZShcIi4vbXVsdGktaW5oZXJpdGFuY2VcIik7XHJcbmxldCBBSkFYID0gcmVxdWlyZShcIi4vQUpBWFwiKTtcclxubGV0IENSRUFURV9HUklEID0gcmVxdWlyZShcIi4vY3JlYXRlR3JpZFwiKTtcclxubGV0IFBPUFVQX1dJTkRPVyA9IHJlcXVpcmUoXCIuL3BvcHVwV2luZG93XCIpO1xyXG5cclxucmVxdWlyZShcIi4uL2Nzcy9zdHlsZS5jc3NcIik7XHJcblxyXG5jbGFzcyBWYXJpYWJsZXNBbmRDb21tb25GdW5jdGlvbnMge1xyXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcclxuXHJcbiAgICB0aGlzLmNvbW1lbnRzT2JqID0ge307XHJcbiAgICB0aGlzLnBpY3R1cmVPYmogPSBbXTtcclxuICAgIHRoaXMuaWNvbnNPYmogPSBbXTtcclxuICB9XHJcblxyXG4gIGZpbmREaXZFbGVtKHNyYywgY3NzKSB7XHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7Y3NzfWApO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaXYubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IHNvdXJjZSA9IGRpdltpXS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2Uuc2xpY2UoNSwgLTIpO1xyXG4gICAgICBpZiAoc291cmNlID09IHNyYykgcmV0dXJuIGRpdltpXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNyZWF0ZVN0cmluZ0RhdGUoKSB7XHJcbiAgICBsZXQgdGltZSA9IG5ldyBEYXRlKCk7XHJcbiAgICBsZXQgZGF0ZSA9IHRpbWUuZ2V0RGF0ZSgpIDwgMTAgPyBcIjBcIiArIHRpbWUuZ2V0RGF0ZSgpIDogdGltZS5nZXREYXRlKCk7XHJcbiAgICBsZXQgbW9udGggPSB0aW1lLmdldE1vbnRoKCkgKyAxIDwgMTAgPyBcIjBcIiArICh0aW1lLmdldE1vbnRoKCkgKyAxKSA6IHRpbWUuZ2V0TW9udGgoKSArIDE7XHJcbiAgICBsZXQgaG91ciA9IHRpbWUuZ2V0SG91cnMoKSArIDEgPCAxMCA/IFwiMFwiICsgdGltZS5nZXRIb3VycygpIDogdGltZS5nZXRIb3VycygpO1xyXG4gICAgbGV0IG1pbnV0ZSA9IHRpbWUuZ2V0TWludXRlcygpIDwgMTAgPyBcIjBcIiArIHRpbWUuZ2V0TWludXRlcygpIDogdGltZS5nZXRNaW51dGVzKCk7XHJcbiAgICB0aW1lID0gZGF0ZSArIFwiLlwiICsgbW9udGggKyBcIi5cIiArIHRpbWUuZ2V0RnVsbFllYXIoKVxyXG4gICAgICAgICAgKyBcIiBcIiArIGhvdXIgKyBcIjpcIiArIG1pbnV0ZTtcclxuXHJcbiAgICByZXR1cm4gdGltZTtcclxuICB9XHJcbn1cclxuVmFyaWFibGVzQW5kQ29tbW9uRnVuY3Rpb25zLmNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaW1hZ2UtZ2FsbGVyeVwiKTtcclxuXHJcblZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucy5jb250YWluZXIucXVhbnRpdHkgPSAwO1xyXG5WYXJpYWJsZXNBbmRDb21tb25GdW5jdGlvbnMuaWNvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5pY28gPiBpbWdcIik7XHJcblZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucy5wb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wdXBcIik7XHJcblZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucy5jbG9zZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2UtYnRuXCIpO1xyXG5WYXJpYWJsZXNBbmRDb21tb25GdW5jdGlvbnMucG9wdXBQaWMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBvcHVwLXBpY1wiKTtcclxuVmFyaWFibGVzQW5kQ29tbW9uRnVuY3Rpb25zLnBvcHVwQmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLWJnXCIpO1xyXG5WYXJpYWJsZXNBbmRDb21tb25GdW5jdGlvbnMubGlrZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubGlrZVwiKTtcclxuVmFyaWFibGVzQW5kQ29tbW9uRnVuY3Rpb25zLmRpc2xpa2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc2xpa2VcIik7XHJcblZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucy5jb21tZW50V2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb21tZW50cy13aW5kb3dcIilcclxuVmFyaWFibGVzQW5kQ29tbW9uRnVuY3Rpb25zLnVwbG9hZFdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudXBsb2FkLXBpY1wiKTtcclxuXHJcblZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucy5wb3B1cExpa2VTdGF0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb3B1cC1saWtlLXN0YXRcIik7XHJcblZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucy5wb3B1cERpc2lrZVN0YXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwLWRpc2xpa2Utc3RhdFwiKTtcclxuVmFyaWFibGVzQW5kQ29tbW9uRnVuY3Rpb25zLnBvcHVwQ29tbWVudFN0YXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcHVwX19jb21tZW50cy1xdWFudGl0eVwiKTtcclxuXHJcblZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucy5mb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZW5kLWNvbW1lbnRcIik7XHJcblZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucy5mb3JtU3VibWl0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZW5kLWNvbW1lbnQgYnV0dG9uXCIpO1xyXG5cclxuXHJcbi8vIGNyZWF0ZSBjbGFzcyB3aXRoIEFKQVggcmVxdWVzdHNcclxuY2xhc3MgQUpBWF9yZXF1ZXN0cyBleHRlbmRzIG11bHRpSW5oZXJpdC5pbmhlcml0KEFKQVgsIFZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucykge1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGNyZWF0ZSBjbGFzcyB0byBjcmVhdGUgZ3JpZFxyXG5jbGFzcyBDcmVhdGVHcmlkIGV4dGVuZHMgbXVsdGlJbmhlcml0LmluaGVyaXQoQ1JFQVRFX0dSSUQsIFZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucykge1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGNyZWF0ZSBjbGFzcyB0byBjcmVhdGUgcG9wdXAgd2luZG93IGZ1bmN0aW9uYWxpdHlcclxuY2xhc3MgUG9wdXBXaW5kb3cgZXh0ZW5kcyBtdWx0aUluaGVyaXQuaW5oZXJpdChQT1BVUF9XSU5ET1csIFZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucykge1xyXG4gIGNvbnN0cnVjdG9yKHBhcmFtcykge1xyXG4gICAgc3VwZXIoKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5sZXQgcmVxID0gbmV3IEFKQVhfcmVxdWVzdHMoKTtcclxubGV0IGdyaWRDcmVhdGluZyA9IG5ldyBDcmVhdGVHcmlkKCk7XHJcbmxldCB3aW5kb3dQb3B1cCA9IG5ldyBQb3B1cFdpbmRvdygpO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlR2FsbGVyeSgpIHtcclxuICByZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG4gICAgcmVxLnJlcXVlc3RGb3JQaWN0dXJlcyhWYXJpYWJsZXNBbmRDb21tb25GdW5jdGlvbnMpLFxyXG4gICAgcmVxLnJlcXVlc3RGb3JEYXRhKFZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucylcclxuICBdKVxyXG4gIC50aGVuKCgpID0+IHtcclxuICAgIGdyaWRDcmVhdGluZy5zZXRHcmlkTWFwQXJyKCk7XHJcbiAgICBncmlkQ3JlYXRpbmcuc2V0VG9HcmlkKCcnLCBncmlkQ3JlYXRpbmcucmVmcmVzaEluZm9Gb3JTaW5nbGVJbWFnZSwgVmFyaWFibGVzQW5kQ29tbW9uRnVuY3Rpb25zKTtcclxuICAgIHdpbmRvd1BvcHVwLmFkZEV2ZW50c09uQnV0dG9ucyhWYXJpYWJsZXNBbmRDb21tb25GdW5jdGlvbnMsIHJlcS5zZW5kQ29tbWVudHMsIGdyaWRDcmVhdGluZy5yZWZyZXNoSW5mb0ZvclNpbmdsZUltYWdlKTtcclxuICAgIFxyXG4gIH0pXHJcbiAgLmNhdGNoKChlcnJvcikgPT4ge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xyXG4gIH0pXHJcbn1cclxuXHJcblxyXG5leHBvcnRzLlZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucyA9IFZhcmlhYmxlc0FuZENvbW1vbkZ1bmN0aW9ucztcclxuZXhwb3J0cy5yZXEgPSByZXE7XHJcbmV4cG9ydHMuZ3JpZENyZWF0aW5nID0gZ3JpZENyZWF0aW5nO1xyXG5leHBvcnRzLndpbmRvd1BvcHVwID0gd2luZG93UG9wdXA7XHJcblxyXG5cclxuY3JlYXRlR2FsbGVyeSgpO1xyXG5cclxuY29uc29sZS5sb2coXCJzdGFydGVkXCIpO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuIiwiLy8gQ2xhc3MgZm9yIGNyZWF0aW5nIG11bHRpIGluaGVyaXRhbmNlLlxyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIG11bHRpIHtcclxuXHQvLyBJbmhlcml0IG1ldGhvZCB0byBjcmVhdGUgYmFzZSBjbGFzc2VzLlxyXG5cdHN0YXRpYyBpbmhlcml0KC4uLl9iYXNlcylcclxuXHR7XHJcblx0XHRjbGFzcyBjbGFzc2VzIHtcclxuXHJcblx0XHRcdC8vIFRoZSBiYXNlIGNsYXNzZXNcclxuICBcdFx0XHRnZXQgYmFzZSgpIHsgcmV0dXJuIF9iYXNlczsgfVxyXG5cclxuXHRcdFx0Y29uc3RydWN0b3IoLi4uX2FyZ3MpXHJcblx0XHRcdHtcclxuXHRcdFx0XHR2YXIgaW5kZXggPSAwO1xyXG5cclxuXHRcdFx0XHRmb3IgKGxldCBiIG9mIHRoaXMuYmFzZSkgXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdFx0bGV0IG9iaiA9IG5ldyBiKF9hcmdzW2luZGV4KytdKTtcclxuICAgXHRcdFx0XHRcdG11bHRpLmNvcHkodGhpcywgb2JqKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdFxyXG5cdFx0fVxyXG5cclxuXHRcdC8vIENvcHkgb3ZlciBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzXHJcblx0XHRmb3IgKGxldCBiYXNlIG9mIF9iYXNlcykgXHJcblx0XHR7XHJcbiAgIFx0XHRcdG11bHRpLmNvcHkoY2xhc3NlcywgYmFzZSk7XHJcbiAgIFx0XHRcdG11bHRpLmNvcHkoY2xhc3Nlcy5wcm90b3R5cGUsIGJhc2UucHJvdG90eXBlKTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY2xhc3NlcztcclxuXHR9XHJcblxyXG5cdC8vIENvcGllcyB0aGUgcHJvcGVydGllcyBmcm9tIG9uZSBjbGFzcyB0byBhbm90aGVyXHJcblx0c3RhdGljIGNvcHkoX3RhcmdldCwgX3NvdXJjZSkgXHJcblx0e1xyXG4gICAgXHRcdGZvciAobGV0IGtleSBvZiBSZWZsZWN0Lm93bktleXMoX3NvdXJjZSkpIFxyXG5cdFx0XHR7XHJcbiAgICAgICAgXHRcdGlmIChrZXkgIT09IFwiY29uc3RydWN0b3JcIiAmJiBrZXkgIT09IFwicHJvdG90eXBlXCIgJiYga2V5ICE9PSBcIm5hbWVcIikgXHJcblx0XHRcdFx0e1xyXG5cdCAgICAgICAgXHQgICAgbGV0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKF9zb3VyY2UsIGtleSk7XHJcblx0ICAgICAgICBcdCAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX3RhcmdldCwga2V5LCBkZXNjKTtcclxuICAgICAgICBcdFx0fVxyXG4gICAgXHRcdH1cclxuXHR9XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IGNsYXNzIFBvcHVwV2luZG93IHtcclxuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XHJcblxyXG4gICAgdGhpcy5jc3MgPSB7XHJcbiAgICAgIGltYWdlOiBcImltYWdlXCIsXHJcbiAgICAgIHBvcHVwU3RhdDogXCJwb3B1cC1zdGF0XCIsXHJcbiAgICAgIGxpa2VCdG5BY3RpdmU6IFwibGlrZV9hY3RpdmVcIixcclxuICAgICAgZGlzbGlrZUJ0bkFjdGl2ZTogXCJkaXNsaWtlX2FjdGl2ZVwiLFxyXG4gICAgICBzaG93OiBcInNob3dcIixcclxuICAgICAgc2hvd0ZsZXg6IFwic2hvdy1mbGV4XCJcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgfVxyXG5cclxuICBhZGRFdmVudHNPbkJ1dHRvbnMoY2xhc3NPYmosIHJlcSwgcmVmcmVzaCkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vIGJpbmQgdG8gZXZlcnkgYW5vbnltb3VzIGhhbmRsZXIgbmVlZGVkIGNvbnRleHRcclxuICAgIGNsYXNzT2JqLmxpa2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgY2xhc3NPYmoubGlrZS5jaGlsZHJlblswXS5zcmMgPSBcImltYWdlL2xpa2UtYWN0aXZlLnBuZ1wiO1xyXG4gICAgICBjbGFzc09iai5saWtlLmNsYXNzTGlzdC5hZGQoYCR7dGhpcy5jc3MubGlrZUJ0bkFjdGl2ZX1gKTtcclxuICAgICAgY2xhc3NPYmouZGlzbGlrZS5jbGFzc0xpc3QucmVtb3ZlKGAke3RoaXMuY3NzLmRpc2xpa2VCdG5BY3RpdmV9YCk7XHJcbiAgICBcclxuICAgICAgbGV0IGltZyA9IHRoaXMuZmluZERpdkVsZW0oY2xhc3NPYmoucG9wdXBQaWMuc3JjLCB0aGlzLmNzcy5pbWFnZSk7XHJcbiAgICBcclxuICAgICAgaWYgKGltZy5saWtlID09IC0xKSB7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7dGhpcy5jc3MucG9wdXBTdGF0fWApWzBdLmlubmVyVGV4dCA9IGltZy5saWtlU3RhdCArIDE7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7dGhpcy5jc3MucG9wdXBTdGF0fWApWzFdLmlubmVyVGV4dCA9IGltZy5kaXNsaWtlU3RhdDtcclxuICAgICAgICBjbGFzc09iai5kaXNsaWtlLmNoaWxkcmVuWzBdLnNyYyA9IFwiaW1hZ2UvZGlzbGlrZS5wbmdcIlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3RoaXMuY3NzLnBvcHVwU3RhdH1gKVswXS5pbm5lclRleHQgPSBpbWcubGlrZVN0YXQgKyAxO1xyXG4gICAgICB9XHJcbiAgICAgIGltZy5saWtlID0gMTtcclxuICAgIH0uYmluZChzZWxmKSk7XHJcblxyXG4gICAgY2xhc3NPYmouZGlzbGlrZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xyXG4gICAgICBjbGFzc09iai5kaXNsaWtlLmNoaWxkcmVuWzBdLnNyYyA9IFwiaW1hZ2UvZGlzbGlrZS1hY3RpdmUucG5nXCI7XHJcbiAgICAgIGNsYXNzT2JqLmRpc2xpa2UuY2xhc3NMaXN0LmFkZChgJHt0aGlzLmNzcy5kaXNsaWtlQnRuQWN0aXZlfWApO1xyXG4gICAgICBjbGFzc09iai5saWtlLmNsYXNzTGlzdC5yZW1vdmUoYCR7dGhpcy5jc3MubGlrZUJ0bkFjdGl2ZX1gKTtcclxuICAgIFxyXG4gICAgICBsZXQgaW1nID0gdGhpcy5maW5kRGl2RWxlbShjbGFzc09iai5wb3B1cFBpYy5zcmMsIHRoaXMuY3NzLmltYWdlKTtcclxuICAgIFxyXG4gICAgICBpZiAoaW1nLmxpa2UgPT0gMSkge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3RoaXMuY3NzLnBvcHVwU3RhdH1gKVswXS5pbm5lclRleHQgPSBpbWcubGlrZVN0YXQ7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLiR7dGhpcy5jc3MucG9wdXBTdGF0fWApWzFdLmlubmVyVGV4dCA9IGltZy5kaXNsaWtlU3RhdCArIDE7XHJcbiAgICAgICAgY2xhc3NPYmoubGlrZS5jaGlsZHJlblswXS5zcmMgPSBcImltYWdlL2xpa2UucG5nXCJcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuJHt0aGlzLmNzcy5wb3B1cFN0YXR9YClbMV0uaW5uZXJUZXh0ID0gaW1nLmRpc2xpa2VTdGF0ICsgMTtcclxuICAgICAgfVxyXG4gICAgICBpbWcubGlrZSA9IC0xO1xyXG4gICAgfS5iaW5kKHNlbGYpKTtcclxuXHJcbiAgICBjbGFzc09iai5jb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICAgICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XHJcbiAgICAgIGxldCBzb3VyY2UgPSBlLnRhcmdldC5zcmM7XHJcblxyXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09IHRoaXMuY3NzLmltYWdlKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgY2xhc3NPYmoucG9wdXBCZy5jbGFzc0xpc3QuYWRkKGAke3RoaXMuY3NzLnNob3d9YCk7XHJcbiAgICAgICAgY2xhc3NPYmoucG9wdXAuY2xhc3NMaXN0LmFkZChgJHt0aGlzLmNzcy5zaG93RmxleH1gKTtcclxuICAgICAgICBjbGFzc09iai5wb3B1cC5zdHlsZS5sZWZ0ID0gKHcgLSA4MTApLzIgKyBcInB4XCI7IC8vINGA0LDRgdGB0YfQuNGC0YvQstCw0LXQvCDQvtGC0YHRgtGD0L8g0LTQu9GPINGG0LXQvdGC0YDQuNGA0L7QstCw0L3QuNGPIHBvcHVwXHJcbiAgICAgICAgY2xhc3NPYmoucG9wdXAuc3R5bGUudG9wID0gKGggLSA1OTApLzIgKyBcInB4XCI7IC8vINGA0LDRgdGB0YfQuNGC0YvQstCw0LXQvCDQvtGC0YHRgtGD0L8g0YHQstC10YDRhdGDINC00LvRjyDRhtC10L3RgtGA0LjRgNC+0LLQsNC90LjRjyBwb3B1cFxyXG4gICAgICAgIGNsYXNzT2JqLnBvcHVwLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLnNyYyA9IHNvdXJjZTtcclxuICAgICAgICB0aGlzLnJlZnJlc2hJbmZvRm9yUG9wdXAoY2xhc3NPYmoucG9wdXAsIGNsYXNzT2JqKTtcclxuICAgICAgfSBcclxuICAgIH0uYmluZChzZWxmKSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2xvc2UtYnRuXCIpIHx8IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInBvcHVwLWJnXCIpKSB7XHJcbiAgICAgICAgY2xhc3NPYmoucG9wdXBCZy5jbGFzc0xpc3QucmVtb3ZlKGAke3RoaXMuY3NzLnNob3d9YCk7XHJcbiAgICAgICAgY2xhc3NPYmoucG9wdXAuY2xhc3NMaXN0LnJlbW92ZShgJHt0aGlzLmNzcy5zaG93RmxleH1gKTtcclxuICAgIFxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICB0aGlzLmNsZWFySW5mbyhjbGFzc09iaik7XHJcbiAgICAgICAgICB0aGlzLnN0YW5kYXJ0TGlrZURpc2xpa2UodGhpcy5maW5kRGl2RWxlbShjbGFzc09iai5wb3B1cFBpYy5zcmMsIHRoaXMuY3NzLmltYWdlKSwgY2xhc3NPYmopO1xyXG4gICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfSBcclxuICAgIH0uYmluZChzZWxmKSk7XHJcblxyXG4gICAgY2xhc3NPYmouZm9ybVN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRoaXMuY29tbWVudHNSZXF1ZXN0KHJlcSwgcmVmcmVzaCwgY2xhc3NPYmopO1xyXG4gICAgfS5iaW5kKHNlbGYpKVxyXG4gIH1cclxuXHJcblxyXG5cclxuICByZWZyZXNoSW5mb0ZvclBvcHVwKHBvcCwgY2xhc3NPYmopIHtcclxuXHJcbiAgICBsZXQga2V5ID0gcG9wLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLnNyYztcclxuICAgIGxldCBpbWcgPSB0aGlzLmZpbmREaXZFbGVtKGtleSwgdGhpcy5jc3MuaW1hZ2UpO1xyXG4gICAgaWYgKGltZy5pbWFnZURhdGEpIHtcclxuICBcclxuICAgICAgLy8g0YPQtNCw0LvRj9C10Lwg0LrQvtC80LzQtdC90YLRi1xyXG4gICAgICB0aGlzLmNsZWFySW5mbyhjbGFzc09iaik7XHJcbiAgXHJcbiAgICAgIC8vIGNvbW1lbnRzXHJcbiAgICAgIGxldCBjb21tU3RhdCA9IGltZy5pbWFnZURhdGEubGVuZ3RoO1xyXG4gICAgICBcclxuICAgICAgY2xhc3NPYmoucG9wdXBDb21tZW50U3RhdC5pbm5lclRleHQgPSBjb21tU3RhdDtcclxuICBcclxuICAgICAgLy8g0L/QvtC60LDQt9GL0LLQsNC10Lwg0LrQvtC80LzQtdC90YLRi1xyXG4gICAgICB0aGlzLnNob3dDb21tZW50cyhpbWcuaW1hZ2VEYXRhLCBjbGFzc09iaik7XHJcbiAgXHJcbiAgICAgIGNsYXNzT2JqLnBvcHVwTGlrZVN0YXQuaW5uZXJUZXh0ID0gaW1nLmxpa2VTdGF0O1xyXG4gICAgICBjbGFzc09iai5wb3B1cERpc2lrZVN0YXQuaW5uZXJUZXh0ID0gaW1nLmRpc2xpa2VTdGF0O1xyXG4gICAgfSBcclxuICB9XHJcblxyXG5cclxuICBjb21tZW50c1JlcXVlc3QocmVxLCByZWZyZXNoLCBjbGFzc09iaikge1xyXG5cclxuICAgIGxldCBuaWNrTmFtZSA9IGNsYXNzT2JqLmZvcm0uY2hpbGRyZW5bMF0udmFsdWU7XHJcbiAgICBsZXQgY29tbWVudCA9IGNsYXNzT2JqLmZvcm0uY2hpbGRyZW5bMV0udmFsdWU7XHJcbiAgXHJcbiAgICBpZiAobmlja05hbWUgPT0gXCJcIiB8fCBjb21tZW50ID09IFwiXCIpIHJldHVybiBhbGVydChcIkVudGVyIHlvdXIgbmFtZSBvciBjb21tZW50XCIpO1xyXG4gIFxyXG4gICAgbGV0IGltYWdlTmFtZSA9IGNsYXNzT2JqLnBvcHVwUGljLnNyYztcclxuICAgIGxldCBpbWcgPSB0aGlzLmZpbmREaXZFbGVtKGltYWdlTmFtZSwgdGhpcy5jc3MuaW1hZ2UpO1xyXG4gICAgXHJcbiAgICBsZXQgbGlrZWQgPSBpbWcubGlrZSA9PSB1bmRlZmluZWQgPyAwIDogaW1nLmxpa2U7XHJcbiAgXHJcbiAgICAvLyDQvtGH0LjRgdGC0LrQsCDQt9C90LDRh9C10L3QuNC5INGE0L7RgNC80YtcclxuICAgIGNsYXNzT2JqLmZvcm0uY2hpbGRyZW5bMF0udmFsdWUgPSBcIlwiO1xyXG4gICAgY2xhc3NPYmouZm9ybS5jaGlsZHJlblsxXS52YWx1ZSA9IFwiXCI7XHJcbiAgXHJcbiAgICAvLyDRg9GB0YLQsNC90L7QstC60LAg0LLRgNC10LzQtdC90LhcclxuICAgIGxldCB0aW1lID0gdGhpcy5jcmVhdGVTdHJpbmdEYXRlKCk7XHJcblxyXG4gIFxyXG4gICAgbGV0IGpzb24gPSBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgIFtpbWFnZU5hbWVdOiB7XHJcbiAgICAgICAgbmljazogbmlja05hbWUsXHJcbiAgICAgICAgY29tbTogY29tbWVudCxcclxuICAgICAgICBkYXRlOiB0aW1lLFxyXG4gICAgICAgIGxpa2U6IGxpa2VkXHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIFxyXG4gICAgLy8g0L/QvtC40YHQuiDQutCw0YDRgtC40L3QutC4INC4INC/0YDQuNGB0LLQvtC10L3QuNC1INC10Lkg0LTQsNC90L3Ri9GFXHJcbiAgICBpbWcuaW1hZ2VEYXRhLnB1c2goe1xyXG4gICAgICBuaWNrOiBuaWNrTmFtZSxcclxuICAgICAgY29tbTogY29tbWVudCxcclxuICAgICAgZGF0ZTogdGltZSxcclxuICAgICAgbGlrZTogbGlrZWRcclxuICAgIH0pXHJcbiAgICBcclxuICAgIHRoaXMuc3RhbmRhcnRMaWtlRGlzbGlrZShpbWcsIGNsYXNzT2JqKTtcclxuICAgIFxyXG4gICAgcmVxKGpzb24sIGZ1bmN0aW9uKHhocikge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNsYXNzT2JqLmNvbW1lbnRzT2JqID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBpbWcubGlrZVN0YXQgPSBjbGFzc09iai5wb3B1cExpa2VTdGF0LmlubmVyVGV4dDtcclxuICAgICAgICBpbWcuZGlzbGlrZVN0YXQgPSBjbGFzc09iai5wb3B1cERpc2lrZVN0YXQuaW5uZXJUZXh0O1xyXG4gICAgICAgIHRoaXMucmVmcmVzaEluZm9Gb3JQb3B1cChjbGFzc09iai5wb3B1cCwgY2xhc3NPYmopO1xyXG4gICAgICAgIHJlZnJlc2goaW1nKTtcclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH0uYmluZCh0aGlzKSlcclxuICAgXHJcbiAgXHJcbiAgfVxyXG4gIFxyXG4gIFxyXG4gIHN0YW5kYXJ0TGlrZURpc2xpa2Uob2JqLCBjbGFzc09iaikge1xyXG4gICAgY2xhc3NPYmouZGlzbGlrZS5jbGFzc0xpc3QucmVtb3ZlKGAke3RoaXMuY3NzLmRpc2xpa2VCdG5BY3RpdmV9YCk7XHJcbiAgICBjbGFzc09iai5saWtlLmNsYXNzTGlzdC5yZW1vdmUoYCR7dGhpcy5jc3MubGlrZUJ0bkFjdGl2ZX1gKTtcclxuICAgIGNsYXNzT2JqLmRpc2xpa2UuY2hpbGRyZW5bMF0uc3JjID0gXCJpbWFnZS9kaXNsaWtlLnBuZ1wiO1xyXG4gICAgY2xhc3NPYmoubGlrZS5jaGlsZHJlblswXS5zcmMgPSBcImltYWdlL2xpa2UucG5nXCJcclxuICAgIG9iai5saWtlID0gMDtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgLy8g0L/QvtC60LDQt9Cw0YLRjCDQutC+0LzQvNC10L3RgtCw0YDQuNC4LCDQu9Cw0LnQutC4INCy0L4g0LLRgNC10LzRjyDQt9Cw0LPRgNGD0LfQutC4INGB0YLRgNCw0L3QuNGG0YtcclxuICBzaG93Q29tbWVudHModmFsdWUsIGNsYXNzT2JqKSB7XHJcbiAgICBsZXQgZGF0ZU5hbWVSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICBsZXQgY29tbVJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0clwiKTtcclxuICBcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICBcclxuICAgICAgZGF0ZU5hbWVSb3cuaW5uZXJIVE1MID0gXCI8dGQ+PGRpdj48L2Rpdj48L3RkPjx0ZD48ZGl2PjwvZGl2PjwvdGQ+XCI7XHJcbiAgICAgIFxyXG4gICAgICBkYXRlTmFtZVJvdy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pbm5lclRleHQgPSBcIkJ5IFwiICsgdmFsdWVbaV0ubmljaztcclxuICAgICAgZGF0ZU5hbWVSb3cuY2hpbGRyZW5bMV0uY2hpbGRyZW5bMF0uaW5uZXJUZXh0ID0gdmFsdWVbaV0uZGF0ZTtcclxuICAgICAgZGF0ZU5hbWVSb3cuY2xhc3NOYW1lID0gXCJpbm5lci1jb21tZW50LWFib3ZlXCI7IFxyXG4gICAgICBcclxuICAgICAgY29tbVJvdy5pbm5lckhUTUwgPSBcIjx0ZCBjb2xzcGFuPScyJz48ZGl2PjwvZGl2PjwvdGQ+XCI7XHJcbiAgICAgIGNvbW1Sb3cuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uaW5uZXJUZXh0ID0gdmFsdWVbaV0uY29tbTtcclxuICAgICAgY29tbVJvdy5jbGFzc05hbWUgPSBcImlubmVyLWNvbW1lbnRcIjtcclxuICBcclxuICAgICAgY2xhc3NPYmouY29tbWVudFdpbmRvdy5hcHBlbmRDaGlsZChkYXRlTmFtZVJvdy5jbG9uZU5vZGUodHJ1ZSkpO1xyXG4gICAgICBjbGFzc09iai5jb21tZW50V2luZG93LmFwcGVuZENoaWxkKGNvbW1Sb3cuY2xvbmVOb2RlKHRydWUpKTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLy8gY2xlYXIgYWxsIGZpZWxkcyBpbiBwb3B1cCB3aW5kb3dcclxuICBjbGVhckluZm8oY2xhc3NPYmopIHtcclxuICAgIGNsYXNzT2JqLmNvbW1lbnRXaW5kb3cuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGNsYXNzT2JqLnBvcHVwQ29tbWVudFN0YXQuaW5uZXJUZXh0ID0gMDtcclxuICAgIGNsYXNzT2JqLnBvcHVwTGlrZVN0YXQuaW5uZXJUZXh0ID0gMDtcclxuICAgIGNsYXNzT2JqLnBvcHVwRGlzaWtlU3RhdC5pbm5lclRleHQgPSAwO1xyXG4gIH1cclxufSJdLCJzb3VyY2VSb290IjoiIn0=
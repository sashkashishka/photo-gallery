const multiInherit = require("./multi-inheritance");
let AJAX = require("./AJAX");
let CREATE_GRID = require("./createGrid");
let POPUP_WINDOW = require("./popupWindow");

require("../css/style.css");

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








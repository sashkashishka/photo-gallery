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
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
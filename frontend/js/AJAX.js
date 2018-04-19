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
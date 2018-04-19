// выставить элемент добавления фотографии
function setAddImgElem() {
  let elem = document.createElement("div");
  let addElem = document.createElement("div");
  addElem.className = "add-button";
  addElem.innerHTML = '<img src="image/add_icon.png" class="add-button">'
  let text = document.createElement("p");
  text.innerText = "Add your Picture";

  elem.appendChild(addElem);
  elem.appendChild(text);

  elem.className = "add-picture";
  elem.style.width = cellWidth + "px";
  elem.style.height = cellHeight + "px";
  let addElemPosition = findFreeSpace();
  
  position(addElemPosition, elem);
  container.appendChild(elem);
  gridMap[addElemPosition.x][addElemPosition.y] = 1;
}
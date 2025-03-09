
function renderList(){
const shoppingList = document.getElementById(
"shoppingList"
);
let items = read();
shoppingList.innerHTML="";//clear the UI before rendering
//update the list display
items.forEach((item,index)=>{
    const li = document.createElement("li");
//li.className="theClass";
    li.innerHTML=`
    <div class = "fulllist"
    <div class = "title-img">
    <span>${item.title}</span>
    <br>
    <div class ="imgBook-container">
    <img src="${item.image}">
    </div>
    </div>
    <div class = "bookInfo-container">
    <span>Author: </span>
    <span>${item.author}</span>
    <br>
    <span>Price: </span>
    <span>${item.price}</span>
    <br>
    <span>Sinopsis: </span>
    <span>${item.sinopsis}</span>
    </div>
    </div>
    `;

    shoppingList.appendChild(li);
});

}

document.addEventListener("DOMContentLoaded",renderList);


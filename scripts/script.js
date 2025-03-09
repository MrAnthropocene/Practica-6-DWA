function Book(title,author,price,sinopsis,image){
    this.title = title;
    this.author = author;
    this.price = price;
    this.sinopsis = sinopsis;
    this.image = image;
}
const itemInput = document.getElementById("bookItem");
const authorInput = document.getElementById("authorItem");
const priceInput = document.getElementById("priceItem");
const sinopsisInput = document.getElementById("sinopsisId");
const addItemBtn = document.getElementById("purchaseBtn");
const shoppingList = document.getElementById("shoppingList");
const imgInput = document.getElementById("previewImage");
let imgSelect = document.getElementById("imgId");
function register(){
    let newBook = new Book(
        itemText,
        authorText,
        priceText,
        sinopsisText
    );
    console.log(newBook);
    save(newBook);
    console.log("TIME");
}

document.addEventListener("DOMContentLoaded",()=>{
    //all the code will be here
        
        let items = read();//array to store items
        
    
        function renderList(){
            shoppingList.innerHTML="";//clear the UI before rendering
            //update the list display
            items.forEach((item,index)=>{
                const li = document.createElement("li");
            //li.className="theClass";
                li.innerHTML=`
                <span>${item.title}</span>
                <br>
                <div class ="imgBook-container">
                <img src="${item.image}">
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
                <button onclick="editTask(${index})">Edit</button>
                <button onclick = "deleteItem(${index})">❌</button>
                `;
    
                shoppingList.appendChild(li);
            });
        
        }
        //function to delete an item
        window.deleteItem = (deleteIndex)=>{
            //console.log("Deleting index "+ deleteIndex);

            items.splice(deleteIndex,1); //remove from the array
            let books = JSON.parse(localStorage.getItem("books")) || []; // Obtener la lista
            books.splice(deleteIndex, 1); // Eliminar el libro en la posición 'index'
            localStorage.setItem("books", JSON.stringify(books)); // Guardar la lista actualizada
            renderList(); //update the list
            console.log(items);
        }
        // Function to edit an item
    window.editTask = (editIndex) => {
        const li = shoppingList.children[editIndex];
        const item = items[editIndex];
        
        // Replace the span with an input field
        li.innerHTML = `
            <form class = "editForm">
            <input type="text" id="edittitleInput${editIndex}" value="${item.title}">
            <input type="text" id="editauthorInput${editIndex}" value="${item.author}">
            <input type="text" id="editpriceInput${editIndex}" value="${item.price}">
            <textarea class ="txtAEdit" name="sinopsis" id="editSinopsisInput${editIndex}" value="${item.sinopsis}">
            </textarea>
            </form>
            <div class = "editButtons">
            <button onclick="saveEdit(${editIndex})">Add</button>
            <button onclick="imageEdit(${editIndex})">Image</button>
            <button onclick="cancelEdit(${editIndex})">Cancel</button>
            </div>
        `;
    }
    window.imageEdit = (editIndex) => {
        const newImg = prompt("Please enter new image url: ");
        let books = read(); 
        const item = items[editIndex];
        const item2 = books[editIndex];
        
        if (newImg !== null && newImg.trim() !== "") {
            item.image = newImg.trim();
            item2.image = newImg.trim();
            localStorage.setItem("books", JSON.stringify(books)); // Guardar la lista actualizada
        }
    }
         // Function to save the edited item
        window.saveEdit = (editIndex) => {
            let books = read(); 
            const item = books[editIndex];
            const item2 = items[editIndex];
            const changeTitleinput = document.getElementById(`edittitleInput${editIndex}`);
            const changeAuthorinput = document.getElementById(`editauthorInput${editIndex}`);
            const changePriceinput = document.getElementById(`editpriceInput${editIndex}`);
            const changeSinopsisinput = document.getElementById(`editSinopsisInput${editIndex}`);
            const newName = changeTitleinput.value.trim();
            const newAuthor = changeAuthorinput.value.trim();
            const newPrice = changePriceinput.value.trim();
            const newSinopsis = changeSinopsisinput.value.trim();
            if (newName === ""||newAuthor === ""||newPrice === ""||newSinopsis === "") {
                alert("Items info cannot be empty");
                return;
            }            
            item.title = newName;
            item.author = newAuthor;
            item.price = newPrice;
            item.sinopsis = newSinopsis;
            item2.title = newName;
            item2.author = newAuthor;
            item2.price = newPrice;
            item2.sinopsis = newSinopsis;
            localStorage.setItem("books", JSON.stringify(books)); 
            renderList();
        }
        window.cancelEdit = (editIndex) => {
            renderList();
        }
        addItemBtn.addEventListener("click",()=>{
            let itemText = itemInput.value.trim();
            let authorText = authorInput.value.trim();
            let priceText = priceInput.value.trim();
            let sinopsisText = sinopsisInput.value.trim();
            let imgText = imgSelect.value.trim();
            //for registering items
            if(itemText == ""|| authorText == ""||priceText == ""||sinopsisText == ""){
                alert("Item cannot be empty");
                return;
            }
            let newBook= new Book(itemText,authorText,priceText,sinopsisText,imgText);
            items.push(newBook);
            save(newBook);
            renderList();
        });
        renderList();
    });
    
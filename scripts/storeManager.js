function save(book){
    let list = read();
    list.push(book);
    let val = JSON.stringify(list);
    localStorage.setItem("books",val);
}

function read(){
    let data = localStorage.getItem("books")
    if(!data){
        return [];
    }
    else{
        return JSON.parse(data);
    }
}
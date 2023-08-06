// Check if user entered before get the prev data otherwise create empty array
if (localStorage.getItem('productList') == null) {
    productList = []

}else{
    productList = JSON.parse(localStorage.getItem('productList'));
    DisplayProducts(productList);
}

// Get Input tags 
let productName = document.querySelector("#productName") 
let productPrice = document.querySelector("#productPrice")
let productCat = document.querySelector("#productCat") 
let productDesc = document.querySelector("#productDesc") 
// Sucess
// console.log(productName, productPrice, productCat, productDesc)

// Current Index to use in update function 
let CurrentIndex = null;

let key = "";



// Buttons
let addBtn = document.querySelector("#addBtn")
// let deleteBtn = document.querySelector("#deleteBtn")
// let updateBtn = document.querySelector("#updateBtn")




var addProduct =  function(){
    // Get data added by user
    // console.log(productName, productPrice, productCat)
    let product = {
        productName : productName.value,
        productPrice : productPrice.value,
        productCat : productCat.value,
        productDesc: productDesc.value,
    };

    // New product pushed to our list then add the whole list to product list
    // Finally update Ui
    productList.push(product);
    updateIndex();
    // console.log(productList)
    localStorage.setItem('productList', JSON.stringify(productList));
    DisplayProducts(productList);
    clearForm();
}

// Display products in list 
function DisplayProducts (productList){
    let res="" ;
    for (const [index, product] of productList.entries()){

        res += `
            <tr>
            <th scope="row">${product.i+1}</th>
            <td class="nameSearch">${product.productName}</td>
            <td>${product.productPrice}</td>
            <td>${product.productCat}</td>
            <td>
                <button  onclick="updateProduct(${product.i})" class="btn btn-info">
                    update
                </Button>
            </td>
            <td> <button id="deleteBtn" onclick="deleteProduct(${product.i})" class="btn btn-info btn-danger">
                delete
            </Button>
        </td>
            </tr>`
    }

    // add the whole div to the ui
    
// Container to append table with
let container = document.querySelector("#cont") 
    container.innerHTML = res;


    // SearchItems
    
}


// Clear form after adding to the main list
let clearForm = function () {
    productName.value = ""
    productPrice.value=""
    productCat.value = ""
    productDesc.value = ""

}


// Grab values add add them to the inputs 
// change btn to update 
// when clicked update values in main list
let updateProduct = function (i)
{
    CurrentIndex = i;
    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    
    // put current values in inputs
    productName.value =productList[i].productName;
    productPrice.value =productList[i].productPrice;
    productCat.value =productList[i].productCat;
    productDesc.value =productList[i].productDesc;
    

}

//Main Update Btn
updateBtn.addEventListener('click', function () {
    
    // Get data
    productList[CurrentIndex].productName  =  productName.value;
    productList[CurrentIndex].productPrice = productPrice.value;
    productList[CurrentIndex].productCat = productCat.value;
    productList[CurrentIndex].productDesc = productDesc.value;

    //Display updated item
    console.log(productList[CurrentIndex])

    //update in local storage 
    clearForm();
    
    updateBtn.classList.add("d-none");
    addBtn.classList.remove("d-none");
    
    
    localStorage.setItem('productList', JSON.stringify(productList));
    DisplayProducts(productList);

    // Get recent key data to highlight
    key = document.getElementById("search").value;
    searchByName(key);

    // edit  ui
    CurrentIndex = null;

})



// Delete Btn 
let deleteProduct = function(i)
{   
    productList.splice(i,1);
    updateIndex();

    // Empty search to display items after deletion
    localStorage.setItem('productList', JSON.stringify(productList));
    DisplayProducts(productList);

    // Get recent key data to highlight
    key = document.getElementById("search").value;
    searchByName(key);
    // console.log('Deleted !')
}

// Add function to the Btn 

addBtn.addEventListener('click', function(){
    addProduct();
    // console.log('Added !')
})





// Update indecies in main list
let updateIndex = function (){

    for (const [index, product] of productList.entries()){
        product.i = index;
        // console.log(product)
    }
}



// Search 
// Key is passed to the function 
// I filter the main Product list in a new filtered array
// then pass it to display product list
// loop to highlight the key of search


let searchByName = function(key){
    key = key.toLowerCase()
    // console.log(key)
    if(key != ""){
        const result = productList.filter(checkName);

        function checkName(currValue,index) {
            // console.log(currValue.productName.toLowerCase().includes(key))
            return currValue.productName.trim().toLowerCase().includes(key);
            
        }
        DisplayProducts(result)
    }else{
        productList = JSON.parse(localStorage.getItem('productList'))
        DisplayProducts(productList);
    }

    if(key != ""){
        let names = Array.from(document.querySelectorAll(".nameSearch"));

        for (const name of names){
            let mainName = name.innerText.trim().toLowerCase();
            const getStartEnd = (str, sub) => [str.indexOf(sub), str.indexOf(sub) + sub.length - 1]
            let start = getStartEnd(mainName, key)[0]
            let end = getStartEnd(mainName, key)[1]
            // console.log(mainName.slice(0,endIndex+1), mainName.slice(endIndex+2,mainName.length))
            name.innerHTML = `
            <td class="nameSearch">
            ${mainName.slice(0,start)}
            <span class="bg-success p-1">
            ${mainName.slice(start,end+1)}</span>${mainName.slice(end+1,mainName.length)}
            
            </td>

            `
        }
    }

}





// Validate Name
let validateName = function(){
    // console.log(productName.value)
    let regx = /^[A-Z][a-zA-Z0-9]{5,10}$/;

    if(regx.test(productName.value)){
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");

    }else{
        productName.classList.add("is-invalid");
    }

}

let validatePrice = function(){
    let regx = /^[1-9][0-9]{2,}$/;

    if(regx.test(productPrice.value)){
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");

    }else{
        productPrice.classList.add("is-invalid");
    }

}


let validateDesc = function(){

    if(productDesc.value.length > 45){
        productDesc.classList.add("is-valid");
        productDesc.classList.remove("is-invalid");

    }else{
        productDesc.classList.add("is-invalid");
    }

}

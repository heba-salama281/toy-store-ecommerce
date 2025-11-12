let signLinks = document.getElementById('signLinks');
let welcomeMsg = document.getElementById('welcomeMsg');
let userEmail = localStorage.getItem('email');
let firstName = localStorage.getItem('firstName');
let logoutBtn = document.getElementById('logout-btn');
let loginLinks = document.getElementById('loginLinks');

if(userEmail){
    signLinks.remove();
    loginLinks.style.display='flex';
    welcomeMsg.innerHTML = 'Welcome ' + firstName;
}

function check(){
    if(userEmail){
        window.location('login.html')
    }
}

logoutBtn.addEventListener('click', function(){
    localStorage.clear();
    signLinks.style.display= 'flex';
    loginLinks.style.display='none';
    //console.log('ok')
})



let productsAll = document.getElementById('products');

let products = [{
    id:1,
    title: "Toy Rabbit Doll Keychains, Doll for Kids - Different Colors (Blue)",
    price: 100,
    category: "doll",
    image: "images/04.jpg"
},
{
    id:2,
    title: "Barbie Fashionistas Dolls, Toy for Kids 3 to 8 Years Old",
    price: 155,
    category: "doll",
    image: "images/01.jpg"
},
{
    id:3,
    title: "TOYS LAND Lucy Beauty Doll With Accessories",
    price: 115,
    category: "doll",
    image: "images/02.jpg"
},
{
    id:4,
    title: "L.O.L. Surprise The Original Tots Ball",
    price: 150,
    category: "ball",
    image: "images/ball.jpg"
},
{
    id:5,
    title: "L.O.L. Surprise The Original Tots Ball",
    price: 155,
    category: "ball",
    image: "images/ball2.jpg"
},
{
    id:6,
    title: "Doll House Playset with 4 Play Areas and 11 Decor Accessories",
    price: 300,
    category: "doll",
    image: "images/doll-house.jpg"
},
{
    id:7,
    title: "Maikerry Upgraded Version Crocodile Teeth Game for Kids Party",
    price: 105,
    category: "toys",
    image: "images/toys2.jpg"
},
{
    id:8,
    title: "bessome 2 Pack RC Cars Toys for Ages 2-4 Toddlers|Remote Control Bumper Cars Toys",
    price: 2000,
    category: "cars",
    image: "images/cars1.jpg"
},
{
    id:9,
    title: "Welly Nex Die-Cast Metal Model Car - 1:24 - Bugatti Chiron 24077W, 8+",
    price: 2200,
    category: "cars",
    image: "images/cars2.jpg"
},
{
    id:10,
    title: "Spring Garden Art Jigsaw Puzzle, 1000 Pieces, 50x50 cm, Purple Box",
    price: 180,
    category: "puzzles",
    image: "images/puzzle.jpg"
},
{
    id:11,
    title: "KRIDEZ Wood Intelligence Brain Games,Mini Travel Puzzles for Kids",
    price: 180,
    category: "puzzles",
    image: "images/puzzle2.jpg"
},
{
    id:12,
    title: "Toys for Girls - Unicorn Stuffed Animal",
    price: 250,
    category: "toys",
    image: "images/toy.jpg"
}
]

// search in the products

let searchBtn = document.getElementById('searchBtn');
let seachInput = document.getElementById('seachInput');
let selectCategory = document.getElementById('selectCategory');

let addCartBtns = document.querySelectorAll('.addCart');
let shoppingCart = document.getElementById('shoppingCart');
let cartLayer = document.getElementById('cart-layer');
let shoppingCartCount = document.getElementById('shopping-cart-count');
let CartCount= 0;
let chosenProductArrs= localStorage.getItem('cartContent');
let chosenFavArrs = localStorage.getItem('favProducts');
let page = window.location.pathname.split("/").pop();
let productsView = document.getElementById('productsView');
let totalPrice = 0;
let totalPriceElement = document.getElementById('totalPrice')
let favViewElement = document.getElementById('favView')



// change the favorite numbers saved in the local storage into array
if(chosenFavArrs){
    chosenFavArrs= chosenFavArrs.split(",").map(Number);

    chosenFavArrs.forEach(item => {
        console.log(item);
         if(page == 'view-products.html'){
            drawViewFavPage(item);
         }
    })
  
}else{
    
    chosenFavArrs = []
}


// change the product numbers saved in the local storage into array
if(chosenProductArrs){
    //console.log(chosenProductArrs)
    chosenProductArrs= chosenProductArrs.split(",").map(Number);
    let uniqueIds = [...new Set(chosenProductArrs)];
    uniqueIds.forEach(item => {    
        drawCartLayer(item); 

        if(page == 'view-products.html'){
            console.log('pagggggggggggggggggge')
            drawViewProductsPage(item);

        }
    }
);
    cartCount()
}else{
    
    chosenProductArrs = []
}

//update the price in the view cart page
function updatePrice(price, lenght, job){
    if(job === 1){
        totalPrice +=  price * lenght;
    }else{
        totalPrice -=  price * lenght;
    }
    totalPriceElement.innerText= totalPrice;
}

// draw chosen products in view-products page

function drawViewProductsPage(chosenID) {
  //productsView.innerHTML = '';

  // Use chosenItem if available; otherwise show all products
  //search in the product objects to find 1 product that match the id of the chosen id
            let chosenItem = products.find(function(item){
                return item.id === chosenID;
            })

            //filter to get the number of repeated products
            let chosenItemCount = chosenProductArrs.filter(function(item){
                return item === chosenID;
            })
            
            updatePrice(chosenItem.price, chosenItemCount.length, 1)
            

  // Create one HTML string for all items
  productsView.innerHTML +=  `
    <div id='cartConatiner${chosenItem.id}' class="col-12 col-lg-6 col-md-6 col-sm-6 mb-3" >
     <div class="card p-4">
      <div class="row" style='height:200px'>

        <div class="col-3 view-page-img">
            <img class="card-img-top" src="${chosenItem.image}" alt="${chosenItem.title}" style="width:100%; height:auto">
        </div>

        <div class="col-9">
          <h5 class="card-title multiline-truncate">${chosenItem.title}</h5>
          <div class="product-data">
            <span>Category: </span><span>${chosenItem.category}</span><br/>
            <span>Price: </span><span>LE</span>
            <span id='cartprice${chosenItem.id}'>${chosenItem.price * chosenItemCount.length}</span></div> 

            <div class="row product-buttons">
                <div class='col-12 col-md-12 col-lg-5 mt-2'>
                    <button onclick='decreaseProduct(${chosenItem.id}, ${chosenItem.price})' type='submit' class="btn btn-light btn-outline">-</button>
                        <span class="chosen-count" id='cartCount${chosenItem.id}'>${chosenItemCount.length}</span>
                    <button  onclick='increaseProduct(${chosenItem.id}, ${chosenItem.price})' type='submit' class="btn btn-light btn-outline">+</button>
                </div>
                <div class='col-12 col-md-12 col-lg-7 mt-2'>
                    <button id='addToCart${chosenItem.id}' type="button" class="btn btn-secondary col-8 removeCart " onclick='removeFromCart(${chosenItem.id}), updatePrice(${chosenItem.price}, ${chosenItemCount.length}, 0)'
                    style='background-color: rgb(128, 40, 66)'
                    value= 'Remove from Cart' >Remove from Cart</button>
                </div>
            </div>

          </div>

        </div>
        </div>
      </div>
  
    `
}

// draw favorite products in view-products page

function drawViewFavPage(favId){

    console.log(favId)
    let favItem = products.find(function(item){
        return item.id === favId;
    })

    // Create one HTML string for all items
  favViewElement.innerHTML +=  
  `
    <div id='favConatiner${favItem.id}' class="mb-3 box" >
      <div class="card fav-card">

        <img class="card-img-top" src="${favItem.image}" alt="${favItem.title}" style="width:100%">
        
        <div class="card-body">
            <h5 class="card-title multiline-truncate">${favItem.title}</h5>
          
            <span>Category: </span><span>${favItem.category}</span><br/>
            
            <button id='removeFav${favItem.id}' class="col-4 p-0 fav mt-2" onclick='removeFromFav(${favItem.id})' value='0'>
                <i id='FavIcon${favItem.id}' style='color:rgb(116, 10, 42)' class="fas fa-heart" 
                ></i>
            </button>
        
          </div>
        </div>
      </div>
  
    `
  

}


// draw products in index page function

function drawItems(chosenItem) {
  productsAll.innerHTML = '';

  // Use chosenItem if available; otherwise show all products
  const items = chosenItem && chosenItem.length ? chosenItem : products;


  // Create one HTML string for all items
  const productsHTML = items.map(item => `
    <div class="col-12 col-lg-4 col-md-6 col-sm-6 mb-3">
      <div class="card">
        <img class="card-img-top" src="${item.image}" alt="${item.title}" style="width:100%">
        <div class="card-body">
          <h4 class="card-title multiline-truncate">${item.title}</h4>
          <div class="product-data">
            <span>Price: </span><span>${item.price}</span><br/>
            <span>Category: </span><span>${item.category}</span>
          </div>
          <div class="row product-buttons">
            <button id='addToFav${item.id}' class="col-4 p-0 fav" onclick='addToFav(${item.id})' value='0'>
                <i id='FavIcon${item.id}' class="fas fa-heart" 
                style='${chosenFavArrs.includes(item.id) ? 'color: #740a2aff' : 'color: #353535ff'}'
                ></i>
            </button>
            <button id='addToCart${item.id}' type="button" class="btn btn-secondary col-8 addCart" onclick='addToCart(${item.id}, ${item.price}) 
            ' style='${chosenProductArrs.includes(item.id) ? 'background-color: rgb(128, 40, 66)' : 'background-color: #5c636a'}'
            ' value='${chosenProductArrs.includes(item.id) ? 'Remove from Cart' : 'Add to Cart'}' >
            ${chosenProductArrs.includes(item.id) ? 'Remove from Cart' : 'Add to Cart'}</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  productsAll.innerHTML = productsHTML;
}

// draw product after reload

if (page == 'index.html'){
    drawItems();
}

// else if(page == 'view-cart.html'){
//     //drawViewProductsPage()
// }

shoppingCart.addEventListener('click', function(){
    if(cartLayer.style.display=='flex'){
        cartLayer.style.display='none';
    }else if(cartLayer.style.display='none' && shoppingCartCount.innerHTML != 0){
        cartLayer.style.display='flex';
    }
    
})


function decreaseProduct(id, price){
    
    let countEL = document.getElementById(`count${id}`);
    let priceEl = document.getElementById(`price${id}`);

    let priceCount = Number(priceEl.innerHTML);
    let productCountNum = Number(countEL.innerHTML);

    if(productCountNum > 1){
        
        priceEl.innerHTML = priceCount - price;
        countEL.innerHTML = productCountNum -1;
        //remove the element from the array
        let index = chosenProductArrs.indexOf(id);

        if (index !== -1) {
            chosenProductArrs.splice(index, 1); // remove 1 element at that index
        };
        cartCount();

        //insert cart into local storage
        localStorage.setItem('cartContent', chosenProductArrs);

        if(page == 'view-products.html'){
            document.getElementById(`cartCount${id}`).innerHTML=  productCountNum -1;
            updatePrice(price, 1, 0)
        }

    }else if(productCountNum == 1){

        document.getElementById(`productContainer${id}`).remove();

                //search in the array for the removed product array
        let removedIDS = [id]

        let result = chosenProductArrs.filter(num => !removedIDS.includes(num));

        chosenProductArrs = [...result];

        cartCount();

        //insert cart into local storage
        localStorage.setItem('cartContent', chosenProductArrs);

        document.getElementById(`cartConatiner${id}`).remove();

       if(page == 'view-products.html'){
            
            updatePrice(price, 1, 0)
        }


    }
}

function increaseProduct(id, price){
    
    let countEL = document.getElementById(`count${id}`);
    let priceEl = document.getElementById(`price${id}`);

    let productCountNum = Number(countEL.innerHTML);
    let priceCount = Number(priceEl.innerHTML);

    countEL.innerHTML = productCountNum + 1;
    priceEl.innerHTML = priceCount + price;

    chosenProductArrs.push(id);
    //console.log(chosenProductArrs);
    cartCount();
    console.log('price' + price);

    //insert cart into local storage
    localStorage.setItem('cartContent', chosenProductArrs);

    if(page == 'view-products.html'){
        document.getElementById(`cartCount${id}`).innerHTML=  productCountNum + 1;
        updatePrice(price, 1, 1)
    }


}

// add to favorite in the index page
function addToFav(id){
    
    if (userEmail) {
        let addFavBtn = document.getElementById(`addToFav${id}`);
        let addFavIcon = document.getElementById(`FavIcon${id}`);
        
         if(addFavBtn.value == '0'){

            addFavIcon.style.color = '#740a2aff';
            chosenFavArrs.push(id);
            addFavBtn.value= '1';

            console.log(chosenFavArrs)

         }else{

            addFavIcon.style.color = '#353535ff';
            addFavBtn.value= '0';

            let removedFav = [id]

            let result = chosenFavArrs.filter(num => !removedFav.includes(num));

            chosenFavArrs = [...result]
         }

    localStorage.setItem('favProducts', chosenFavArrs);


    }else{
        window.location = 'login.html';
    }

}

// remove from favorite in the view-products page

function removeFromFav(FavID){

    document.getElementById(`favConatiner${FavID}`).remove();

    let removedFav = [FavID]

    let result = chosenFavArrs.filter(num => !removedFav.includes(num));

    chosenFavArrs = [...result]

    console.log('removedFav', removedFav, 'result', result)

    localStorage.setItem('favProducts', chosenFavArrs);
    
}


// function executed when click on add to cart button
function addToCart(id, price){
    
    let chosenItem;
    if (userEmail) {
            let addToCartBtn = document.getElementById(`addToCart${id}` )

            if(addToCartBtn.value == 'Add to Cart'){

                //change the button to remove from cart
           
                addToCartBtn.style.backgroundColor ='#802842';

                addToCartBtn.value = 'Remove from Cart'

                addToCartBtn.textContent = 'Remove From Cart'

                // add chosen product to products Cart Array
                chosenProductArrs.push(id);

                let productIdCount = chosenProductArrs.filter(function(item){
                    return item === id;
                });

                //search in the product objects to find 1 product that match the id of the chosen id
                // let chosenItem = products.find(function(item){
                //     return item.id === id;
                // });

                // add chosen products to cart layer
                drawCartLayer(id, price)

            }

            else{


                addToCartBtn.style.backgroundColor ='#3f3f3fff';

                addToCartBtn.value = 'Add to Cart';
                addToCartBtn.textContent = 'Add To Cart'

                document.getElementById(`productContainer${id}`).remove();

                //search in the array for the removed product array
                let removedIDS = [id]

                let result = chosenProductArrs.filter(num => !removedIDS.includes(num));

                chosenProductArrs = [...result]

            }
            

            //insert cart into local storage
            localStorage.setItem('cartContent', chosenProductArrs);

            cartCount();
          
           
        } else {
            window.location = 'login.html';
        }
    }

    //remove from view cart page function 

    function removeFromCart(id){

            document.getElementById(`cartConatiner${id}`).remove();
            document.getElementById(`productContainer${id}`).remove();

            //search in the array for the removed product array
            let removedIDS = [id]

            let result = chosenProductArrs.filter(num => !removedIDS.includes(num));

            //console.log(chosenProductArrs , 'sss', id, 'removed', result)

            chosenProductArrs = [...result]

            localStorage.setItem('cartContent', chosenProductArrs);

            cartCount();
    }

    // draw cart layer
    function drawCartLayer(chosenID){

            //search in the product objects to find 1 product that match the id of the chosen id
            let chosenItem = products.find(function(item){
                return item.id === chosenID;
            })

            //filter to get the number of repeated products
            let chosenItemCount = chosenProductArrs.filter(function(item){
                return item === chosenID;
            })

            //draw the cart product
            cartLayer.innerHTML +=  
                        `<div id='productContainer${chosenItem.id}' class='row productContainer'>
                            <div class='col-8 cart-pt'>${chosenItem.title}</div> 
                            <div class='col-4'><span>Price:</span>
                            <span id='price${chosenItem.id}'>${chosenItem.price * chosenItemCount.length}</span></div> 
                            <div class='col-12 mt-2'>
                                <button onclick='decreaseProduct(${chosenItem.id}, ${chosenItem.price})' type='submit' class="btn btn-light btn-outline"> - </button>
                                    <span class='chosen-count' id='count${chosenItem.id}'>${chosenItemCount.length}</span>
                                <button  onclick='increaseProduct(${chosenItem.id}, ${chosenItem.price})' type='submit' class="btn btn-light btn-outline">+</button>
                            </div>
                        </div>`;
    }

    //update [product count]
    function cartCount(){
        CartCount = chosenProductArrs.length;
        shoppingCartCount.innerHTML = CartCount;
    }


    // search products code

searchBtn.addEventListener('click', function (event) {
  event.preventDefault(); // stops page refresh
  searchProducts();
});


function searchProducts() {

  let selectCategoryItem = selectCategory.value;
  let seachInput = document.getElementById('seachInput').value.trim().toLowerCase();

  if (selectCategoryItem == 'category') {

    let chosenItem = products.filter(function(item){
        let category = item.category.toLocaleLowerCase();
        //console.log(category);
        return category === seachInput;
    });

    drawItems(chosenItem);
    
  } else if (selectCategoryItem == 'name') {

   
    let searchWords = seachInput.split(" ");
    console.log(searchWords);

    let chosenItem = products.filter(function(item){
        let title = item.title.toLocaleLowerCase()
        console.log(title);

        return searchWords.some(word => title.includes(word));
    })
    drawItems(chosenItem);
  }

}

navbar = document.querySelector(".navbar");
searchbtn=document.querySelector("#searchbtn");
searchbox=document.querySelector(".searchbox");
carticon=document.querySelector("#cart-icon");
cart=document.querySelector(".cart");
cartclose=document.querySelector("#close-cart");
menu=document.querySelector("#menu");
close=document.querySelector("#close");
  if(menu) {
    menu.onclick =() => {
   menu.classList.toggle("bx-x");
   navbar.classList.toggle("active");
   searchbtn.classList.remove("bx-x");
   searchbox.classList.remove("active");
   cart.classList.remove("active");
   };
  }
  window.onscroll=() =>{
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
   close.classList.remove("active");
   menu.classList.remove("active");   
   searchbtn.classList.remove("active");
  };
  if(searchbtn){
  searchbtn.onclick =()=> {
  searchbox.classList.add("active");
  searchbtn.classList.add("active");
  menu.classList.remove("bx-x");
  navbar.classList.remove("active");
  menu.classList.add("active");
  close.classList.add("active");
  cart.classList.remove("active");
  };
  }
 if (close){
  close.onclick=function(){
  searchbox.classList.remove("active");
  close.classList.remove("active");
  menu.classList.remove("active");
  searchbtn.classList.remove("active");
 };
 }
 if (carticon){
  carticon.onclick=function(){
  cart.classList.add('active');
  searchbox.classList.remove("active");
  navbar.classList.remove("active");
  
};
}
 if (cartclose){
  cartclose.onclick=function(){
  cart.classList.remove("active");
};
}
document.addEventListener('DOMContentLoaded',loadProduct);

function loadProduct(){
  loadContent();
  loadCartFromStorage(); 

}
function loadContent(event){
  var removeItems = document.getElementsByClassName('cart-remove')
  for (var i = 0; i < removeItems.length; i++) {
    var button = removeItems[i]
    button.addEventListener('click', removeCartItem)
  }
  var quantityInput = document.getElementsByClassName('cart-quantity')
  for(var i=0; i<quantityInput.length;i++){
    var input=quantityInput[i]
    input.addEventListener('change', changeQuantity)
  }
  var addCart=document.getElementsByClassName('add-cart')
  for (var i = 0; i < addCart.length; i++) {
    var button = addCart[i]
    button.addEventListener('click', addToCart)
  }
  
  var buybtn = document.getElementsByClassName('btn-buy')[0];
if (buybtn) {
  buybtn.addEventListener('click', buyButton);
}

  
}
function buyButton() {var cartItems = document.getElementsByClassName('cart-content')[0];

  // Check if the cart is empty
  if (!cartItems || cartItems.children.length === 0) {
    alert('Your cart is empty. Add items before placing an order.');
    return;
  }

  // Proceed with order placement
  alert('Proceed to Check-Out?');
  window.location.href="form.html";
  // Clear the cart after placing the order
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }

  // Update the cart display
  updateCart();
  
}

function removeCartItem(event){
   if(confirm('Are Your Sure You Want to Remove The Item')){
  var buttonClicked = event.target
  buttonClicked.parentElement.parentElement.remove()
  updateCart()
   }
}
function changeQuantity(event){
  var input=event.target
  if(isNaN(input.value)|| input.value<=0){
    input.value=1;
  }
  updateCart()
  saveCartToStorage();
}
// Function to save cart content to localStorage
function saveCartToStorage() {
  var cartContainer = document.getElementsByClassName('cart-content')[0];
  var cartBox = cartContainer.getElementsByClassName('cart-box');

  var cartData = [];

  for (var i = 0; i < cartBox.length; i++) {
    var cartBoxs = cartBox[i];

    var title = cartBoxs.getElementsByClassName('cart-product-title')[0].innerText;
    var price = cartBoxs.getElementsByClassName('cart-price')[0].innerText;
    var quantity = cartBoxs.getElementsByClassName('cart-quantity')[0].value;

    cartData.push({ title, price, quantity });
  }

  localStorage.setItem('cartData', JSON.stringify(cartData));
}

// Function to load cart content from localStorage
function loadCartFromStorage() {
  var cartData = localStorage.getItem('cartData');

  if (cartData) {
    cartData = JSON.parse(cartData);

    for (var i = 0; i < cartData.length; i++) {
      var { title, price, quantity } = cartData[i];
      addCartItem(title, price, quantity);
    }

    // Update the cart display
    updateCart();
  }
}



function addToCart(event){
  var button=event.target
  var shopItem=button.parentElement
  var title= shopItem.getElementsByClassName('product-title')[0].innerText
  var price=shopItem.getElementsByClassName('price')[0].innerText
  var imgSrc=shopItem.getElementsByClassName('product-img')[0].src
  //console.log(title,price,imgSrc)
    addCartItem(title,price,imgSrc)
    updateCart()
}

function addCartItem(title,price,imgSrc){
   
   var cartRow=document.createElement('div')
   cartRow.classList.add('cart-content')
   var cartItems=document.getElementsByClassName('cart-content')[0]
   var cartItemName=document.getElementsByClassName('cart-product-title')
   for(var i=0; i<cartItemName.length; i++){
   if(cartItemName[i].innerHTML==title){
     alert('This item is already in the cart')
     return
   }}
   var cartRowContent=`
    <div class="cart-box">
                  <img src="${imgSrc}" alt="image" class="cart-img">
                  <div class="detail-box">
                    <div class="cart-product-title">${title}</div>
                    <div class="price-box">
                    <span class="cart-price">${price}</span>
                    <div class="cart-amt">
                      ₱0.00
                    </div></div>
                    <input type="number" value="1" class="cart-quantity"></input>
                  </div>
                  <i class="bx bxs-trash-alt cart-remove"></i>
                </div>`
   
   cartRow.innerHTML=cartRowContent
   cartItems.append(cartRow)
  cartRow.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName("cart-quantity")[0].addEventListener('change', changeQuantity)
  
}


function updateCart(){
  var cartContainer=document.getElementsByClassName('cart-content')[0]
  var cartBox=cartContainer.getElementsByClassName('cart-box')
  var total=0
  for(var i=0; i<cartBox.length;i++){
     var cartBoxs= cartBox[i]
     
     var priceElement=cartBoxs.getElementsByClassName('cart-price')[0]
     var quantityElement=cartBoxs.getElementsByClassName('cart-quantity')[0]
     var price= parseFloat(priceElement.innerText.replace('₱',''))
     var quantity=parseFloat(quantityElement.value)
     total=total+(price*quantity)
      document.getElementsByClassName('cart-amt')[i].innerText="₱"+(price*quantity);
     
     
  }
  document.getElementsByClassName('total-price')[0].innerHTML="₱"+total
  
  const cartCount = document.querySelector('.cart-count');
  let count = cartBox.length;
  cartCount.innerText = count;
  saveCartToStorage();

}
const buttons = document.querySelectorAll('.btn');
const boxes = document.querySelectorAll('.box');
const searchBox = document.querySelector(".search");

/* Search Product by Textbox */
if (searchBox){
searchBox.addEventListener('keyup', (e) => {
  searchText = e.target.value.toLowerCase().trim();

  boxes.forEach((box) => {
    const title = box.querySelector('.product-title').textContent.toLowerCase().trim();

    if (title.includes(searchText)) {
      box.style.display = 'block';
    } else {
      box.style.display = 'none';
    }
  });

  buttons.forEach((button) => {
    button.classList.remove('btn-clicked');
  });
  buttons[0].classList.add('btn-clicked');
});
}
buttons.forEach((button) => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    setActiveBtn(e);
    const btnfilter = e.target.dataset.filter;

    boxes.forEach((box) => {
      if (btnfilter == 'all') {
        box.style.display = "block";
      } else {
        const boxfilter = box.dataset.item;
        if (btnfilter == boxfilter) {
          box.style.display = "block";
        } else {
          box.style.display = "none";
        }
      }
    });
  });
});

function setActiveBtn(e) {
  buttons.forEach((button) => {
    button.classList.remove('btn-clicked');
  });
  e.target.classList.add('btn-clicked');
}

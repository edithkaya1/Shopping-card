let products = [
  {
    name: "Premium roses",
    image:
      "https://cdn.pixabay.com/photo/2016/11/11/18/52/emotions-1817499_1280.png",
    description: "Bouquet with 12 yellow roses",
    price: 45.90,
    quantity: 1,
  },
  {
    name: "Mixed tulips",
    image:
      "https://cdn.pixabay.com/photo/2019/03/29/18/19/nature-4089827_1280.png",
    description: "Basket with mixed tulips",
    price: 55.90,
    quantity: 1,
  },
  {
    name: "Cheerful flowers",
    image:
      "https://cdn.pixabay.com/photo/2018/09/24/11/01/emotions-3699632_1280.png",
    description: "A romantic summer bouquet",
    price: 47.90,
    quantity: 1,
  },
  {
    name: "Happy Day",
    image:
      "https://cdn.pixabay.com/photo/2019/07/23/06/53/bouquet-4356702_1280.jpg",
    description: "Bouquet with 10 Gerberas",
    price: 35.00,
    quantity: 1,
  },
  {
    name: "Congratulations",
    image:
      "https://cdn.pixabay.com/photo/2016/11/29/13/03/flowers-1869710_1280.jpg",
    description: "Suitable for every occasion",
    price: 49.90,
    quantity: 1,
  },
  {
    name: "Late summer dreams",
    image:
      "https://cdn.pixabay.com/photo/2015/07/10/18/40/still-life-840018_1280.jpg",
    description: "Last memories of the summer",
    price: 39.90,
    quantity: 1,
  },
  {
    name: "Rose magic",
    image:
      "https://cdn.pixabay.com/photo/2017/02/06/00/55/bouquet-2041844_1280.jpg",
    description: "Bouquet with 12 magic roses",
    price: 55.90,
    quantity: 1,
  },
  {
    name: "Autumn beauty",
    image:
      "https://cdn.pixabay.com/photo/2017/07/12/20/59/bouquet-2498384_1280.jpg",
    description: "The beauty of fall in a vase",
    price: 47.90,
    quantity: 1,
  },
  {
    name: "Magic play of colors",
    image:
      "https://cdn.pixabay.com/photo/2016/04/12/21/30/bunch-of-flowers-1325510_1280.jpg",
    description: "A romantic summer bouquet",
    price: 37.90,
    quantity: 1,
  },
];
let result = document.getElementById("result");
products.forEach((product) => {
  result.innerHTML += `
        <div>
             <div class="card my-3 mx-auto w-75">
              <div class="card-header fw-bold">
                  Flowers
              </div>
              <img src="${product.image}" class="card-img-top card-img" alt="${product.image}">
              <div class="card-body">
              <h5 class="card-title fw-bold fs-5">${product.name}</h5>
              <p class="card-text">${product.description}<span> ${(product.price).toFixed(2)} €</span></p>
              </div>
              <div class="card-footer text-body-secondary">
                <button class="btn btn-outline-secondary addToCart"><i class="fa-sharp-duotone fa-solid fa-check"></i> Add to Cart</button>
                </div>
            </div>
          </div>
        </div>
    `;
});
// cart array to hold items added to the cart, at the beginning is empty
let cart = [];
let rowTotal = 0;
// Get all "Add To Cart" buttons
let addToCartBtns = document.querySelectorAll(".addToCart");
// Loop through 'Add to cart' buttons and add click event listeners to each of them
addToCartBtns.forEach((btn, index) => {
  btn.addEventListener("click", function(){
    addToCart(products[index]);
  });
});

// Function to add the selected products to the cart
function addToCart(item){
  // Check if the ordered product is already in the cart
  let existingProduct = cart.find((val) => {
    return val.name == item.name;
  });
  if (existingProduct) {
    item.quantity++;
  } else {
    // If the product is not in the cart, add it
    cart.push(item);
  }
  // Update the cart display(DOM) and recalculate the total price
  displayCart();
  // let ind = cart.indexOf(item);
  // console.log(ind);
  // calculateRow(item, ind);
  calculateTotal();
} //end addToCart

// Function to display the items in the cart (Shopping list)
function displayCart() {
  // Clear the cart display area
  document.getElementById("cart").innerHTML = "";
  cart.forEach((item) => {
    document.getElementById("cart").innerHTML += `
        <div class='row d-flex align-items-center shop'>
            <div class='col-2'>
                <img src="${item.image}" class='img-fluid w-50' alt='${item.name}'>
            </div>
            <div class='col-4'>
                <h5 class='mb-2 fs-5'>${item.name}</h5>
            </div>
             <div class='col-3 d-flex'>
                <button class='btn btn-success plusBtns'>+</button>
                <h5 class='m-2 quantity'>${item.quantity}</h5>
                <button class='btn btn-success minusBtns'>-</button>
            </div>
            <div class='col-2'>
                <h5 class='mb-2 rowPrice fs-5'>${(item.price * item.quantity).toFixed(2)} €</h5>
            </div>
            <div class='col-1 text-end'>
                <button class='btn btn-danger deleteBtns'><i class="fa-solid fa-trash"></i></button>
            </div>
            <hr>
        </div>
    `;
  });
  // Get the buttons for increasing, decreasing quantity, and deleting items
  let plusBtns = document.querySelectorAll(".plusBtns");
  let minusBtns = document.querySelectorAll(".minusBtns");
  let quantityVal = document.querySelectorAll(".quantity");
  let deleteBtns = document.querySelectorAll(".deleteBtns");
  // Loop and add event listeners to "delete" buttons to remove items from the cart
  deleteBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      // Reset the quantity and remove the item from the cart
      cart[index].quantity = 1;
      cart.splice(index, 1);
      // console.log(cart);
      displayCart();
      calculateTotal();
    });
  });
  // Loop and add event listeners to "plus" buttons to increase item quantity
  plusBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      // Increase the quantity
      cart[index].quantity++;
      //   Update the value in the DOM
      quantityVal[index].innerHTML = cart[index].quantity;
      calculateRow(cart[index], index);
      calculateTotal();
    });
  });
  // Loop and add event listeners to "minus" buttons to decrease item quantity
  minusBtns.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      // Only if quantity is more than 1, decrease it
      if (cart[index].quantity > 1) {
        cart[index].quantity--;
        //   Update the value in the DOM
        quantityVal[index].innerHTML = cart[index].quantity;
      } else {
        // Remove the item from the cart if quantity becomes zero so less than 1
        cart.splice(index, 1);
        displayCart();
      }
      calculateRow(cart[index], index);
      calculateTotal();
    });
  });
}
// Function to calculate the total price of the cart
function calculateTotal() {
  let total = 0;
  // Loop through the cart and sum up the total price
  for (let cartItem of cart) {
    total = cartItem.quantity * cartItem.price + total;
  }
  if (total >= 100){
     let total1 = total * 0.1;
     total1 = total1.toFixed(2);
     total = total * 0.9;
     total = total.toFixed(2);
     document.getElementById("discount").innerText = "-" + total1 + "€";
     document.getElementById("total").innerText = total + "€";
  }
  else {
    
    document.getElementById("discount").innerHTML = "";
    document.getElementById("total").innerHTML = total.toFixed(2) + "€";
  }
 }

function calculateRow(item, index) {
    console.log(item, index);
    let rowTotal = item.quantity * item.price;
    rowTotal = rowTotal.toFixed(2);
    let rowPrice = document.querySelectorAll(".rowPrice");
    rowPrice[index].innerHTML = rowTotal + "€";
}
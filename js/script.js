// Show login overlay when click on user icon
var userIcon = document.querySelector('.login-icon');
var loginOverlay = document.querySelector('#login-overlay');

userIcon.addEventListener('click', function() {
  loginOverlay.style.display = 'flex';
});

// Show overlay when click on Driver icon
var drivericon = document.querySelector('.motorcycle-icon');
var driverloginOverlay = document.querySelector('#driver-login-overlay');

drivericon.addEventListener('click', function() {
  driverloginOverlay.style.display = 'flex';
});
// For closing Overlays
function closeOverlay() {
  var loginOverlay = document.getElementById('login-overlay');
  var driverloginOverlay = document.getElementById('driver-login-overlay');
    loginOverlay.style.display = 'none';
    driverloginOverlay.style.display='none';
}

// For closing Overlays



var isScrolling = false;

window.addEventListener('scroll', throttleScroll, false);

function throttleScroll() {
  if (!isScrolling) {
    window.requestAnimationFrame(function() {
      // Perform scroll-related actions here
      isScrolling = false;
    });
  }
  isScrolling = true;
}


  // Cart Showing Code
  function toggleCart() {
    var cart = document.getElementById("sideCart");
    if (cart.style.right === "-350px") {
      // Show the side cart
      cart.style.right = "0";
    } else {
      // Hide the side cart
      cart.style.right = "-350px";
    }
  }
  


  function addToCart(event) {
    event.preventDefault();
    var item = event.target.closest('.dashboard-card');
    var clonedItem = item.cloneNode(true);
    var itemId = clonedItem.getAttribute('data-id');
    clonedItem.style.width = '90%';
    clonedItem.style.height = '200px';
    clonedItem.querySelector('.card-image');
  
    var originalImage = item.querySelector('.card-image');
    var clonedImage = clonedItem.querySelector('.card-image');
    clonedImage.src = originalImage.src;
    var button = clonedItem.querySelector('.add-to-cart-btn');
    button.parentNode.removeChild(button);
    var p =clonedItem.querySelector('p');
    p.parentNode.removeChild(p);
    var content = clonedItem.querySelector('.card-detail');
    content.style.marginTop = '50px';
  
    // Delete Button
    // Delete Icon
    var deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash delete-from-cart-btn';

  
    deleteIcon.onclick = removeItemFromCart;
    clonedItem.appendChild(deleteIcon);
  
    // Plus Button
    var plusButton = document.createElement('button');
    plusButton.className = 'plus-btn';
    plusButton.textContent = '+';
    plusButton.onclick = increaseQuantity;
    clonedItem.appendChild(plusButton);
  
    // Minus Button
    var minusButton = document.createElement('button');
    minusButton.className = 'minus-btn';
    minusButton.textContent = '-';
    minusButton.onclick = decreaseQuantity;
    clonedItem.appendChild(minusButton);
  
    var cart = document.getElementById('sideCart');
    var cartItems = cart.getElementsByClassName('cart-item');
  
    var existingItem = Array.from(cartItems).find(function (item) {
      var cartItemId = item.getAttribute('data-id');
      return cartItemId === itemId;
    });
  
    if (existingItem) {
      // Item already exists in the cart, increase its quantity
      var quantityElement = existingItem.querySelector('.quantity');
      var quantity = parseInt(quantityElement.textContent);
      ++quantity;
      quantityElement.textContent = quantity;
    } else {
      // Item doesn't exist in the cart, add it
      var cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.setAttribute('data-id', itemId);
  
      // Quantity
      var quantityElement = document.createElement('span');
      quantityElement.className = 'quantity';
      quantityElement.textContent = '01';
      clonedItem.querySelector('.card-detail').appendChild(quantityElement);
      cartItem.appendChild(clonedItem);
  
      cart.insertBefore(cartItem, cart.lastElementChild.previousSibling);
  
      // Hide the hint text
      var hintElement = cart.querySelector('.hint-text');
      if (hintElement) {
        hintElement.style.display = 'none';
      }
    }
  
    updateTotalPrice();
  
    // Update item count
    var itemCount = cartItems.length;
    var cartIcon = document.querySelector('.cart-icon');
    cartIcon.setAttribute('data-count', itemCount);
  
    toggleCart();
  }
  
  function increaseQuantity(event) {
    var quantityElement = event.target.parentNode.querySelector('.quantity');
    var quantity = parseInt(quantityElement.textContent);
    quantity = (quantity < 9) ? "0" + (quantity + 1) : quantity + 1;
    quantityElement.textContent = quantity;
  
    updateTotalPrice();
  }
  
  function decreaseQuantity(event) {
    var quantityElement = event.target.parentNode.querySelector('.quantity');
    var quantity = parseInt(quantityElement.textContent);
  
    if (quantity > 1) {
      quantity = (quantity <= 10) ? "0" + (quantity - 1) : quantity - 1;
      quantityElement.textContent = quantity;
      updateTotalPrice();
    } else {
      var cartItem = event.target.closest('.cart-item');
      cartItem.remove();
      updateTotalPrice();
  
      // Update item count
      var cartItems = document.getElementsByClassName('cart-item');
      var itemCount = cartItems.length;
      var cartIcon = document.querySelector('.cart-icon');
      cartIcon.setAttribute('data-count', itemCount);
    }
  }
  
  
  
  function updateTotalPrice() {
    var cartItems = document.getElementsByClassName('cart-item');
    var totalPrice = 0;
  
    Array.from(cartItems).forEach(function (item) {
      var quantityElement = item.querySelector('.quantity');
      var quantity = parseInt(quantityElement.textContent);
      var itemPrice = parseFloat(item.querySelector('.price').textContent); // Update this line to retrieve the price correctly
      totalPrice += itemPrice * quantity;
    });
  
    var totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }  

  // Remove item form the care
  function removeItemFromCart(event) {
    event.preventDefault();
    var item = event.target.closest('.cart-item');
    item.remove();
  
    // Update item count
    var cartItems = document.getElementsByClassName('cart-item');
    var itemCount = cartItems.length;
    var cartIcon = document.querySelector('.cart-icon');
    cartIcon.setAttribute('data-count', itemCount);
  
    updateTotalPrice();
    toggleCart();
  }
  
  
  // To clear the Cart data
function clearCart() {
  var cart = document.getElementById("sideCart");
  var cartItems = cart.getElementsByClassName('dashboard-card');

  // Remove each item from the cart
  while (cartItems.length > 0) {
    cartItems[0].remove();
  }
  
  // Clear the cart data in localStorage
  
  // Reset the item count and total price on the second page
  var cartItemsContainer = document.getElementById('cartItems');
  cartItemsContainer.innerHTML = ''; // Clear the cart items
  
  var cartIcon = document.querySelector('.cart-icon');
  cartIcon.setAttribute('data-count', 0);

  var totalPriceElement = document.getElementById('totalPrice');
  totalPriceElement.innerText = '0.00';
}



// JavaScript code to handle form submission
document.getElementById('driversignupForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  var name = document.getElementById('name').value;
  var age = document.getElementById('age').value;
  var phone = document.getElementById('phone').value;
  var nationalID = document.getElementById('nationalID').value;
  var password = document.getElementById('password').value;
  

  if (name && age && phone && nationalID && password) {
    if (age >= 15 && age <= 80) {
      alert('Sign-up successful! Your information is under consideration. Upon successful acceptance, we will contact you for further processing.');
      // Add your logic here to redirect the user to the next page or perform any other necessary actions
    } else {
      alert('You must be between 15 and 80 years old to apply for this job.');
    }
  } else {
    alert('Please fill in all the required fields.');
  }
});




function scrollToCategory(category, button) {
  // Remove the active class from all buttons
  const buttons = document.getElementsByClassName("menu-btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  // Add the active class to the clicked button
  button.classList.add("active");

  // Scroll to the selected category or top
  if (category === "all") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const targetElement = document.getElementById(category);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}









// Question Answer Sections..
function toggleAnswer(id) {
  var answer = document.getElementById(id);
  var question = document.getElementById("q" + id);
  if (answer.style.display === "none") {
      answer.style.display = "block";
      question.innerHTML = question.innerHTML.replace("〈", "&#x25B2;");
    } else {
      answer.style.display = "none";
      question.innerHTML = question.innerHTML.replace("&#x25B2;", "〈");
    }
}





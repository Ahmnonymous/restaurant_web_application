var userIcon = document.querySelector('.login-icon');
var loginOverlay = document.querySelector('#login-overlay');

userIcon.addEventListener('click', function() {
  loginOverlay.style.display = 'flex';
});

// For closing Overlays
function closeOverlay() {
  var loginOverlay = document.getElementById('login-overlay');
  var verificationOverlay = document.getElementById('verification-overlay');
  
  if (verificationOverlay.style.display !== 'none') {
    verificationOverlay.style.display = 'none';
  } else {
    loginOverlay.style.display = 'none';
  }
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



//To show verification Overlay

function showVerificationOverlay(event) {
  event.preventDefault();
  var phoneInput = document.getElementById('phone');
  var verificationOverlay = document.getElementById('verification-overlay');

  if (phoneInput.value.trim() !== '') {
    verificationOverlay.style.display = 'flex';
  }
}

// For verification Code Validation

function verifyCode(event) {
  event.preventDefault(); 

  var verificationCodeInput = document.getElementById('verification-code');
  var verificationCode = verificationCodeInput.value.trim();
  if (verificationCode === '1234') {
    alert('Verification Successful!');
    closeOverlay();
  } else {
    alert('Invalid Verification Code. Please try again.');
  }
}


var loginForm = document.getElementById('login-form');
var verificationForm = document.getElementById('verification-form');

loginForm.addEventListener('submit', showVerificationOverlay);
verificationForm.addEventListener('submit', verifyCode);


// For Eye toggle button
function toggleVerificationCodeVisibility() {
  var verificationCodeInput = document.getElementById('verification-code');
  var toggleIcon = document.getElementById('toggle-icon');

  if (verificationCodeInput.type === 'text') {
    verificationCodeInput.type = 'password';
    toggleIcon.classList.remove('fa-eye');
    toggleIcon.classList.add('fa-eye-slash');
  } else {
    verificationCodeInput.type = 'text';
    toggleIcon.classList.remove('fa-eye-slash');
    toggleIcon.classList.add('fa-eye');
  }
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
      clonedItem.style.height = '29%';
      var itemImage = clonedItem.querySelector('.card-image');
      itemImage.style.maxWidth = '110px';
      itemImage.style.height = '110px';
      itemImage.style.marginLeft = '2px';
      itemImage.style.marginTop = '-20px';
    
      var originalImage = item.querySelector('.card-image');
      var clonedImage = clonedItem.querySelector('.card-image');
      clonedImage.src = originalImage.src;
      var button = clonedItem.querySelector('.add-to-cart-btn');
      button.parentNode.removeChild(button);
      var p =clonedItem.querySelector('p');
      p.parentNode.removeChild(p);
      var content = clonedItem.querySelector('.card-detail');
      content.style.marginTop = '3px';


      // Delete Button
      // Delete Icon
  var deleteIcon = document.createElement('i');
  deleteIcon.className = 'fas fa-trash delete-from-cart-btn';
  deleteIcon.style.color = 'red';
  deleteIcon.style.position = 'absolute';
  deleteIcon.style.right = '10px';
  deleteIcon.style.bottom = '10px';
  deleteIcon.onclick = removeItemFromCart;
  clonedItem.appendChild(deleteIcon);

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
        quantityElement.textContent = '1';
        quantityElement.style.fontWeight="600";
        clonedItem.querySelector('.card-detail').appendChild(quantityElement);
        cartItem.appendChild(clonedItem);
    
        cart.insertBefore(cartItem, cart.lastElementChild.previousSibling);
    
        // Hide the hint text
        var hintElement = cart.querySelector('.hint-text');
        if (hintElement) {
          hintElement.style.display = 'none';
        }
      }
    
      // Update total price
      var itemPrice = parseFloat(event.target.previousElementSibling.textContent);
      var totalPriceElement = document.getElementById('totalPrice');
      var totalPrice = parseFloat(totalPriceElement.textContent);
      totalPrice += itemPrice;
      totalPriceElement.textContent = totalPrice.toFixed(2);
    
      // Update item count
      var itemCount = cartItems.length;
      var cartIcon = document.querySelector('.cart-icon');
      cartIcon.setAttribute('data-count', itemCount);


      var itemName = item.querySelector('.card-name').textContent; // Get the item name
      var itemPrice = item.querySelector('.card-price').textContent;
      var cartData = localStorage.getItem('cartData');
      if (cartData) {
        // If cartData already exists in localStorage, parse it and update the item
        cartData = JSON.parse(cartData);
        var existingCartItem = cartData.find(function (item) {
          return item.itemId === itemId;
        });
        if (existingCartItem) {
          existingCartItem.quantity++;
        } else {
          cartData.push({
            itemId: itemId,
            itemName: itemName,
            itemPrice: itemPrice,
            quantity: 1,
          });
        }
      } else {
        // If cartData doesn't exist in localStorage, create a new array with the item
        cartData = [{
          itemId: itemId,
          itemName: itemName,
          itemPrice: itemPrice,
          quantity: 1,
        }];
      }
      localStorage.setItem('cartData', JSON.stringify(cartData));
    

      toggleCart();
    }
  
  

  // Remove item form the care
  function removeItemFromCart(event) {
    event.preventDefault();
    var item = event.target.closest('.cart-item');
    var itemPrice = parseFloat(item.querySelector('.price').textContent);
    var quantityElement = item.querySelector('.quantity');
    var quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      // Decrease quantity if greater than 1
      quantity--;
      quantityElement.textContent = quantity;
    } else {
      // Remove the item if quantity is 1
      item.remove();
    }
  
    var totalPriceElement = document.getElementById('totalPrice');
    var totalPrice = parseFloat(totalPriceElement.textContent);
    totalPrice -= itemPrice;
    totalPriceElement.textContent = totalPrice.toFixed(2);
  
    // Update item count
    var cartItems = document.getElementById('sideCart').getElementsByClassName('cart-item');
    var itemCount = cartItems.length;
    var cartIcon = document.querySelector('.cart-icon');
    cartIcon.setAttribute('data-count', itemCount);
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
  localStorage.removeItem('cartData');
  
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





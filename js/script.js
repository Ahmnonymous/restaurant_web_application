const menuButtons = document.querySelectorAll('.menu-btn');
const burgersHeading = document.getElementById('B'); // Get the "Burgers" heading element
const pizzaHeading = document.getElementById('p'); // Get the "Burgers" heading element
const dessertHeading = document.getElementById('d'); // Get the "Burgers" heading element
const beverageHeading = document.getElementById('b'); // Get the "Burgers" heading element

// Add click event listener to each menu button
menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Get the category from the data-category attribute
    const category = button.getAttribute('data-category');
    
    // Hide all food items
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(item => {
      item.style.display = 'none';
    });

    // Show food items of the selected category
    if (category === 'all') {
      // Show all food items
      
    } else {
      // Show food items of the selected category
      const selectedFoodItems = document.querySelectorAll(`.${category}`);
      selectedFoodItems.forEach(item => {
        item.style.display = 'block';
      });
    }

    // Remove the 'active' class from all buttons
    menuButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    // Add the 'active' class to the clicked button
    button.classList.add('active');
    
    // Hide the "Burgers" heading and horizontal line if the selected category is "Pizza"
    if (category === 'pizza') {
      pizzaHeading.style.display='block';
      pizzaHeading.previousElementSibling.style.display='block';
      burgersHeading.style.display = 'none'; // Hide the heading
      beverageHeading.style.display = 'none'; // Hide the heading
      dessertHeading.style.display = 'none'; // Hide the heading
      burgersHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
      dessertHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
      beverageHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
    }
    else if(category==='desserts')
    {
      dessertHeading.style.display='block';
      dessertHeading.previousElementSibling.style.display='block';
      pizzaHeading.style.display='none';
      burgersHeading.style.display = 'none'; // Hide the heading
      beverageHeading.style.display = 'none'; // Hide the heading
      burgersHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
      pizzaHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
      beverageHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
    }
    else if(category==='beverages')
    {
      beverageHeading.style.display='block';
      beverageHeading.previousElementSibling.style.display='block';
      pizzaHeading.style.display='none';
      dessertHeading.style.display='none';
      burgersHeading.style.display = 'none'; // Hide the heading
      burgersHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
      pizzaHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
      dessertHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
    }
    
    else if(category==='burgers'){
      burgersHeading.style.display='block';
      burgersHeading.previousElementSibling.style.display='block';
      pizzaHeading.style.display='none';
      dessertHeading.style.display='none';
      beverageHeading.style.display='none';
      beverageHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
      pizzaHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
      dessertHeading.previousElementSibling.style.display='none'; // Get the next sibling element (the <hr>)
    }
    else{
      foodItems.forEach(item => {
        item.style.display = 'block';
      });
      burgersHeading.style.display='block';
      burgersHeading.previousElementSibling.style.display='block';
      beverageHeading.style.display='block';
      beverageHeading.previousElementSibling.style.display='block';
      dessertHeading.style.display='block';
      dessertHeading.previousElementSibling.style.display='block';
      pizzaHeading.style.display='block';
      pizzaHeading.previousElementSibling.style.display='block';
    }
  });
});



  // Get the cart icon element and initialize the item count
  const carticon = document.getElementById('cart-icon');
  let itemcount = 0;

  // Get all the "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll('.card-detail .btn');

  // Add event listener to each "Add to Cart" button
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Increment the item count
      itemcount++;

      // Update the cart icon text with the new item count
      carticon.innerText = itemcount;
    });
  });







  // Open the login overlay when the user icon is clicked
var userIcon = document.querySelector('.login-icon');
var loginOverlay = document.querySelector('#login-overlay');

userIcon.addEventListener('click', function() {
  loginOverlay.style.display = 'flex';
});


// For closing Overlays
function closeOverlay() {
  var loginOverlay = document.getElementById('login-overlay');
  var verificationOverlay = document.getElementById('verification-overlay');
  loginOverlay.style.display = 'none';
  verificationOverlay.style.display = 'none';
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




// Example JavaScript code for toggling the PayPal and Card fields
var paypalFields = document.getElementById("paypal-fields");
var cardFields = document.getElementById("card-fields");

document.getElementById("paypal-option").addEventListener("change", function() {
  paypalFields.style.display = "block";
  cardFields.style.display = "none";
});

document.getElementById("card-option").addEventListener("change", function() {
  paypalFields.style.display = "none";
  cardFields.style.display = "block";
});




  // Cart Showing Code

  function toggleCart() {
    var cart = document.getElementById("sideCart");
    if (cart.style.right === "-400px") {
      // Show the side cart
      cart.style.right = "0";
    } else {
      // Hide the side cart
      cart.style.right = "-400px";
    }
  }





  function addToCart(event) {
    event.preventDefault();
    var item = event.target.closest('.dashboard-card');
    var clonedItem = item.cloneNode(true);
    var itemId = clonedItem.getAttribute('data-item-id');
  
    var itemImage = clonedItem.querySelector('.card-image');
    itemImage.style.maxWidth = '100px'; // Set the desired maximum width
    itemImage.style.height = '100px'; // Maintain the aspect ratio
  
    var originalImage = item.querySelector('.card-image');
    var clonedImage = clonedItem.querySelector('.card-image');
    clonedImage.src = originalImage.src;
    var button = clonedItem.querySelector('.add-to-cart-btn');
    button.parentNode.removeChild(button);
  
    var content = clonedItem.querySelector('.card-detail');
    content.style.marginTop = '3px'; // Set the desired top margin
  
    var deleteButton = document.createElement('a');
    deleteButton.href = '#';
    deleteButton.className = 'btn delete-from-cart-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.style.color = 'red';
    deleteButton.style.fontSize = '20px';
  
    deleteButton.onclick = removeItemFromCart;
  
    clonedItem.querySelector('.card-detail').appendChild(deleteButton);
  
    var cart = document.getElementById("sideCart");
    var cartItems = cart.getElementsByClassName('cart-item');
  
    var existingItem = Array.from(cartItems).find(function (item) {
      var cartItemId = item.getAttribute('data-item-id');
      return cartItemId === itemId;
    });
  
    if (!existingItem) {
      // Item doesn't exist in the cart, add it
      var cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.setAttribute('data-item-id', itemId);
  
      cartItem.appendChild(clonedItem);
  
      cart.insertBefore(cartItem, cart.lastElementChild.previousSibling);
    }
  
    // Update total price
    var itemPrice = parseFloat(event.target.previousElementSibling.textContent);
  
    var totalPriceElement = document.getElementById('totalPrice');
    var totalPrice = parseFloat(totalPriceElement.textContent);
  
    totalPrice += itemPrice;
  
    totalPriceElement.textContent = totalPrice.toFixed(2);
  
    toggleCart();
  }
  
  
  function removeItemFromCart(event) {
    event.preventDefault();
    var item = event.target.closest('.cart-item');
    var itemPrice = parseFloat(item.querySelector('.price').textContent);
  
    item.remove();
  
    var totalPriceElement = document.getElementById('totalPrice');
    var totalPrice = parseFloat(totalPriceElement.textContent);
  
    totalPrice -= itemPrice;
  
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
  









// To hide cart when click outside the cart
document.addEventListener("click", function (event) {
  var cart = document.getElementById("sideCart");
  if (!cart.contains(event.target)) {
    cart.style.display = "none";
  }
});

// To clear the Cart data
function clearCart() {
  var cart = document.getElementById("sideCart");
  var cartItems = cart.getElementsByClassName('dashboard-card');

  // Remove each item from the cart
  while (cartItems.length > 0) {
    cartItems[0].remove();
  }

  // Reset total price
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

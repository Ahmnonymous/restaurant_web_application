
  const menuButtons = document.querySelectorAll('.menu-btn');

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
        foodItems.forEach(item => {
          item.style.display = 'block';
        });
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






// Cart
// Get the cart icon element and initialize the item count
// Get the cart icon element and initialize the item count
const addToCartButton = document.querySelectorAll('.add-to-cart-btn');
  const sideCart = document.querySelector('.side-cart');
  const cartItems = document.getElementById('cart-items');
  let cartItemCount = 0;

  addToCartButton.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const item = button.parentNode;
      addToCart(item);
    });
  });

  function addToCart(item) {
    const cartItem = item.cloneNode(true);
    cartItems.appendChild(cartItem);
    cartItemCount++;
    updateCartItemCount();
    sideCart.classList.add('active');
  }

  function updateCartItemCount() {
    const cartItemCountElement = document.querySelector('.cart-icon');
    cartItemCountElement.textContent = cartItemCount;
  }

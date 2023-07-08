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
    itemImage.style.marginLeft="15px";
    itemImage.style.marginTop="-80px";
  
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



//   For Scrolling
function scrollToCategory(category) {
  const categoryDiv = document.getElementById(category);
  categoryDiv.scrollIntoView({ behavior: 'smooth' });
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

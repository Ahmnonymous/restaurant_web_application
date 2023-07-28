let cartItems = {}; // Object to store cart items and their counts

// Function to show the overlay
function showOverlay(event) {
  event.preventDefault();
  const itemElement = event.target.closest('.dashboard-card');
  const itemId = itemElement.getAttribute('data-id'); // Extract the item ID from the data-id attribute
  document.getElementById("overlay").style.display = "block";
}

// Function to close the overlay
function closeOverlay(event) {
  event.preventDefault();
  document.getElementById("overlay").style.display = "none";
}

// Function to handle the "Add to Cart" button
function addToCart(event) {
  event.preventDefault();
  const alertMessage = document.createElement('div');
  alertMessage.className = 'alert';
  alertMessage.textContent = 'Item added to cart!';
  document.body.appendChild(alertMessage);

  // Hide the alert after 2 seconds
  setTimeout(function() {
    alertMessage.style.display = 'none';
  }, 2000);
  
  const itemId = event.target.getAttribute('data-id'); // Extract the item ID from the data-id attribute

  // Check if the item already exists in the cart
  if (!cartItems.hasOwnProperty(itemId)) {
    // Item doesn't exist, add it to the cart with count 1
    cartItems[itemId] = 1;

  }

  // Update the cart count indicator in the navbar
  updateCartCount();

  // Close the overlay after adding to cart
}

// Function to update the cart count indicator in the navbar
function updateCartCount() {
  const cartCount = Object.values(cartItems).reduce((total, count) => total + count, 0);
  document.getElementById("cartCount").innerText = cartCount;
}


  
function updateQuantityAndPrice() {
  const quantityElement = document.querySelector(".quantity");
  const priceElement = document.querySelector(".price");

  if (quantityElement && priceElement) {
    quantityElement.textContent = quantity;
    const basePrice = quantity * pricePerItem;
    const addonsPrice = calculateAddonsPrice(); // Calculate the total price of selected addons
    const totalPrice = (basePrice + addonsPrice).toFixed(2);    
    priceElement.textContent = totalPrice;
  }
}
function calculateAddonsPrice() {
  const checkboxes = document.querySelectorAll(".checkbox-options input[type=checkbox]");
  let addonsPrice = 0;

  checkboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      const price = parseFloat(checkbox.nextElementSibling.nextElementSibling.textContent);
      addonsPrice += price;
    }
  });

  return addonsPrice;
}

let quantity = 1;
  const pricePerItem = 560.00; // Adjust this value according to your actual price

  function incrementQuantity() {
    quantity++;
    updateQuantityAndPrice();
  }

  function decrementQuantity() {
    if (quantity > 1) {
      quantity--;
      updateQuantityAndPrice();
    }
  }

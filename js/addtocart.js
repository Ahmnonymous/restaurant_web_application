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

let cartItems = {}; 

function showOverlay(event,itemId) {
  event.preventDefault();
  const itemElement = event.target.closest('.dashboard-card');
  document.getElementById("overlay-" + itemId).style.display = "block";
}

function closeOverlay(event,itemId) {
  event.preventDefault();
  document.getElementById("overlay-" + itemId).style.display = "none";
}

function addToCart(event,itemId) {
  event.preventDefault();
  if (!cartItems.hasOwnProperty(itemId)) {
    cartItems[itemId] = 1;
  }
  updateCartCount();
}

function updateCartCount() {
  const cartCount = Object.values(cartItems).reduce((total, count) => total + count, 0);
  document.getElementById("cartCount").innerText = cartCount;
}

function updateQuantityAndPrice(itemId, price) {
  const quantityElement = document.querySelector("#overlay-" + itemId + " .quantity");
  const priceElement = document.querySelector("#overlay-" + itemId + " .price");

  if (quantityElement && priceElement) {
    quantityElement.textContent = quantity; 
    const basePrice = quantity * price;
    const addonsPrice = calculateAddonsPrice(itemId);
    const totalPrice = (basePrice + addonsPrice).toFixed(2);
    priceElement.textContent = totalPrice;
  }
}

function calculateAddonsPrice(itemId) {
  const checkboxes = document.querySelectorAll("#overlay-" + itemId+" .checkbox-options input[type=checkbox]");
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

  function incrementQuantity(itemId,price) {
    quantity++;
    updateQuantityAndPrice(itemId,price);
  }

  function decrementQuantity(itemId,price) {
    if (quantity > 1) {
      quantity--;
      updateQuantityAndPrice(itemId,price);
    }
  }

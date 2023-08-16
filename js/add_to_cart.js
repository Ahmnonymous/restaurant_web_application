let cartItems = {}; 
const checkedValues = [];

function handleCheckboxChange(event) {
  if (event.target.type === 'checkbox') {
    if (event.target.checked) {
      const value = event.target.value;
      if (!checkedValues.includes(value)) {
        checkedValues.push(value); // Push the value into the checkedValues array if not already present
      }
    } else {
      const value = event.target.value;
      const index = checkedValues.indexOf(value);
      if (index !== -1) {
        checkedValues.splice(index, 1); // Remove the value from checkedValues array if unchecked
      }
    }
    console.log(checkedValues); // Log the array with checked values
  }
}

function update(){
const checkboxes = document.querySelectorAll('.checkbox-options input[type="checkbox"]');
checkboxes.forEach(checkbox => {
checkbox.addEventListener('change', handleCheckboxChange);
});

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


function showOverlay(event,itemId) {
  event.preventDefault();
  const itemElement = event.target.closest('.dashboard-card');
  document.getElementById("overlay-" + itemId).style.display = "block";
  update();
}

function closeOverlay(event,itemId) {
  event.preventDefault();
  document.getElementById("overlay-" + itemId).style.display = "none";
}

function addToCart(event, itemId) {
  event.preventDefault();

  const quantityElement = document.querySelector("#overlay-" + itemId + " .quantity");
  const quantity = parseInt(quantityElement.textContent);

  const alertMessage = createAlertMessage('Item added to cart!');
  displayAlertMessage(alertMessage);

  addToCartItems(itemId);
  updateCartCount();

  const checkedValuesInt = checkedValues.map(value => parseInt(value)).filter(value => !isNaN(value));

  // If checkedValues array is not empty, send separate AJAX requests for each value
  if (checkedValuesInt && checkedValuesInt.length > 0) {
    checkedValuesInt.forEach(value => {
      // Send the data to the server via AJAX
      const data = {
        itemId: itemId,
        quantity: quantity,
        checkedValues: [value], // Pass the value in an array
      };

      const xhr = new XMLHttpRequest();
      xhr.open('POST', './cpp/cart.cgi', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            console.log(response);
          } else {
            console.error('Error:', xhr.status, xhr.statusText);
          }
        }
      };
      xhr.send(JSON.stringify(data));
      checkedValues.length = 0;
    });
  } else {
    // If checkedValues array is empty, send a single AJAX request with an empty array for checkedValues
    const data = {
      itemId: itemId,
      quantity: quantity,
      checkedValues: [], // Empty array to indicate no toppings selected
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', './cpp/cart.cgi', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          console.log(response);
        } else {
          console.error('Error:', xhr.status, xhr.statusText);
        }
      }
    };
    xhr.send(JSON.stringify(data));
    checkedValues.length = 0;
  }
}

function createAlertMessage(message) {
  const alertMessage = document.createElement('div');
  alertMessage.className = 'alert';
  alertMessage.textContent = message;
  return alertMessage;
}

function displayAlertMessage(alertMessage) {
  document.body.appendChild(alertMessage);
  setTimeout(function() {
    alertMessage.style.display = 'none';
  }, 2000);
}

function addToCartItems(itemId) {
  if (!cartItems.hasOwnProperty(itemId)) {
    cartItems[itemId] = 1;
  }
}

function updateCartCount() {
  const cartCount = Object.values(cartItems).reduce((total, count) => total + count, 0);
  document.getElementById("cartCount").innerText = cartCount;
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

function cart(event) {
  const count = parseInt(document.getElementById("cartCount").innerText);
  const cartLink = document.querySelector('.cart-icon-container a.nav-link');

  if (count === 0) {
    event.preventDefault();
    const alertMessage = document.createElement('div');
    alertMessage.className = 'alert';
    alertMessage.textContent = 'Your cart is Empty!';
    document.body.appendChild(alertMessage);
    setTimeout(function () {
      alertMessage.style.display = 'none';
    }, 2000);
  } else {
    cartLink.href = 'cart.html';
  }
}


// Order Status Updation
function status(event, order_id) {
  event.preventDefault();

  const alertMessage = document.createElement('div');
  alertMessage.className = 'updatealert';

  const status = document.getElementById("status" + order_id).value;
  const data = {
    order_id: order_id,
    status: status
  };

  const xhr = new XMLHttpRequest();
  xhr.open('POST', './cpp/u_ord_stat.cgi', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
          // Create the alert message element
        alertMessage.textContent = 'Successfully Updated!';
        document.body.appendChild(alertMessage);

        // Show the alert message
        alertMessage.style.display = 'block';

        // Hide the alert after 2 seconds
        setTimeout(function () {
          alertMessage.style.display = 'none';
        }, 2000);
        
      } else {
        console.error('Error:', xhr.status, xhr.statusText);
      }
    }
  };
  xhr.send(JSON.stringify(data));
}


function show(orderId) {
  const overlayId = 'orderoverlay' + orderId;
  const overlay = document.getElementById(overlayId);
  
  const showOverlayButtonId = 'showOverlay' + orderId;
  const showOverlayButton = document.getElementById(showOverlayButtonId);

  showOverlayButton.addEventListener('click', () => {
    overlay.style.display = 'flex';
  });

  // Close the overlay when clicking outside of it
  window.addEventListener('click', (event) => {
    if (event.target === overlay) {
      overlay.style.display = 'none';
    }
  });
}

// Call the show function to set up the event listeners
show();
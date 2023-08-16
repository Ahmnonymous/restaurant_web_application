// Show login overlay when click on user icon
var userIcon = document.querySelector('.fa-user');
var loginOverlay = document.querySelector('#login-overlay');

userIcon.addEventListener('click', function() {
  loginOverlay.style.display = 'flex';
});

// Show overlay when click on Driver icon
var drivericon = document.querySelector('.fa-motorcycle');
var driverloginOverlay = document.querySelector('#driver-login-overlay');

drivericon.addEventListener('click', function() {
  driverloginOverlay.style.display = 'flex';
});
// For closing Overlays
function closeoverlay() {
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
    

function handleSearch(event) {
  const searchInput = event.target.value.toLowerCase();
  const foodItems = document.querySelectorAll('.food-item');
  let itemsFound = false;

  foodItems.forEach(item => {
    const itemName = item.querySelector('h4').innerText.toLowerCase();
    if (itemName.includes(searchInput)) {
      item.style.display = 'block';
      itemsFound = true;
    } else {
      item.style.display = 'none';
    }
  });

  const allHeadings = document.querySelectorAll('h2.mx-5');
  allHeadings.forEach(heading => {
    const hrLine = heading.nextElementSibling; // Get the hr element
    if (heading.innerText.toLowerCase() === searchInput && itemsFound) {
      heading.style.display = 'block';
      hrLine.style.display = 'block';
      isSearchPerformed = true; // Set the flag to true after the first search
    }
    else if(!searchInput){
      heading.style.display = 'block';
      hrLine.style.display = 'block';
    }
     else {
      heading.style.display = 'none';
      hrLine.style.display = 'none';
    }
  });
  
    const noItemsMessage = document.getElementById('no-items-message');
    if (itemsFound) {
      noItemsMessage.style.display = 'none';
    } else {
      noItemsMessage.style.display = 'block';
    }

  
}
    
    


    // Rate order Stars
    function setRating(stars) {
      const starsElements = document.querySelectorAll('.star');
      starsElements.forEach((star, index) => {
          if (index < stars) {
              star.classList.add('selected');
          } else {
              star.classList.remove('selected');
          }
      });
  }






// Hide the overlay when the button is clicked
document.querySelector('.overlay-select').addEventListener('click', function () {
  document.getElementById('overlay-location').style.display = 'none';
});



// Order Status Updation
function status(event){
  event.preventDefault();

  // Create the alert message element
  const alertMessage = document.createElement('div');
  alertMessage.className = 'updatealert';
  alertMessage.textContent = 'Successfully Updated!';
  document.body.appendChild(alertMessage);

  // Show the alert message
  alertMessage.style.display = 'block';

  // Hide the alert after 2 seconds
  setTimeout(function () {
    alertMessage.style.display = 'none';
  }, 2000);
}



function show() {
  const showOverlayButton = document.getElementById('showOverlay');
  const overlay1 = document.getElementById('orderoverlay');

  showOverlayButton.addEventListener('click', () => {
    overlay1.style.display = 'flex';
  });

  // Close the overlay when clicking outside of it
  window.addEventListener('click', (event) => {
    if (event.target === overlay1) {
      overlay1.style.display = 'none';
    }
  });
}

// Call the show function to set up the event listeners
show();




function updateItem(clas,msg) {
  event.preventDefault();

  const alertMessage = document.createElement('div');
  alertMessage.className = clas;
  alertMessage.textContent = msg;
  document.body.appendChild(alertMessage);
  alertMessage.style.display = 'block';

  setTimeout(function () {
    alertMessage.style.display = 'none';
  }, 2000);

  closeOverlay();
}



function toppingOverlay() {
  openOverlay('toppingOverlay');
}

function deleteItem() {
  openOverlay('deleteOverlay');
}

function openOverlay(overlayId) {
  document.getElementById(overlayId).style.display = 'block';
}
function closeOverlay(overlayId) {
  document.getElementById(overlayId).style.display = 'none';
}
function addTopping() {
  closeOverlay('toppingOverlay');
}

function deleteConfirmed() {
  
  closeOverlay('deleteOverlay');
}





// Code For Live Location of User.


function setLocalStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.error('Local storage is not supported by this browser.');
  }
}

  document.querySelector('.overlay-select').addEventListener('click', function () {
    let inputs = document.querySelectorAll('.overlay-input');
    let filled = true;

    inputs.forEach(input => {
      if (input.value.trim() === '') {
        filled = false;
      }
    });

    if (!filled) {
      alert("Please enter your location first.");
    } else {
      document.getElementById('overlay-location').style.display = 'none';
      document.querySelector('.overlay-select').classList.add('valid');
    }
  });

  document.querySelectorAll('.overlay-input').forEach(input => {
    input.addEventListener('input', function () {
      let allInputsFilled = true;

      document.querySelectorAll('.overlay-input').forEach(input => {
        if (input.value.trim() === '') {
          allInputsFilled = false;
        }
      });

      if (allInputsFilled) {
        document.querySelector('.overlay-select').classList.add('valid');
      } else {
        document.querySelector('.overlay-select').classList.remove('valid');
      }
    });
  });


  function reverseGeocode(latitude, longitude, callback) {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(latitude, longitude);

    geocoder.geocode({ 'latLng': latlng }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                callback(results[0].formatted_address);
            } else {
                callback("Location not found");
            }
        } else {
            callback("Geocoder failed due to: " + status);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
  var hasLocationOverlayShown = localStorage.getItem("locationOverlayShown");
  if (hasLocationOverlayShown !== "true") { 
  if ("geolocation" in navigator) {
    var locationInput = document.getElementById("location-input");
    var overlay = document.getElementById("overlay-location");
    var selectButton = document.getElementById("select-button");

    navigator.geolocation.getCurrentPosition(
      function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);

        reverseGeocode(latitude, longitude, function(formattedLocation) {
          console.log("Formatted Location:", formattedLocation);
          locationInput.value = formattedLocation;
          overlay.style.display = "block";
        });
      },
      function(error) {
        console.error("Error getting location:", error);
        overlay.style.display = "block";
      }
    );

    selectButton.addEventListener("click", function() {
      overlay.style.display = "none";
    });
  } else {
    console.error("Geolocation is not supported by this browser.");
    // You might want to set a default value for locationInput here
  }
}
});










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


  // User Privileges Code
  document.getElementById("assignRole").addEventListener("click", function () {
    var selectedEmployee = document.getElementById("employee").value;
    var selectedRole = document.getElementById("role").value;
    var message = "Role assigned: " + selectedRole + " to " + selectedEmployee;
    alert(message);

    // Optional: You can perform additional actions here, such as updating the server, etc.
});




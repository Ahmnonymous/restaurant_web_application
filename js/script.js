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





// Admin Dashboard JS
document.querySelectorAll('.sidebar-submenu').forEach(e => {
  e.querySelector('.sidebar-menu-dropdown').onclick = (event) => {
      event.preventDefault()
      e.querySelector('.sidebar-menu-dropdown .dropdown-icon').classList.toggle('active')

      let dropdown_content = e.querySelector('.sidebar-menu-dropdown-content')
      let dropdown_content_lis = dropdown_content.querySelectorAll('li')

      let active_height = dropdown_content_lis[0].clientHeight * dropdown_content_lis.length

      dropdown_content.classList.toggle('active')

      dropdown_content.style.height = dropdown_content.classList.contains('active') ? active_height + 'px' : '0'
  }
})
// DARK MODE TOGGLE
let darkmode_toggle = document.querySelector('#darkmode-toggle')

darkmode_toggle.onclick = (e) => {
  e.preventDefault()
  document.querySelector('body').classList.toggle('dark')
  darkmode_toggle.querySelector('.darkmode-switch').classList.toggle('active')
  setDarkChart(document.querySelector('body').classList.contains('dark'))
}

let overlay = document.querySelector('.overlay')
let sidebar = document.querySelector('.sidebar')

document.querySelector('#mobile-toggle').onclick = () => {
  sidebar.classList.toggle('active')
  overlay.classList.toggle('active')
}

document.querySelector('#sidebar-close').onclick = () => {
  sidebar.classList.toggle('active')
  overlay.classList.toggle('active')
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
    
      const burgersHeading = document.querySelector('.mx-5');
      burgersHeading.style.display = 'block'; // Always show the category header
    
      const noItemsMessage = document.getElementById('no-items-message');
      if (itemsFound) {
        noItemsMessage.style.display = 'none';
      } else {
        noItemsMessage.style.display = 'block';
      }
    }
    
    // function searchWithinPage() {
    //   const searchInput = document.getElementById('search-input').value.toLowerCase();
    //   const foodItems = document.querySelectorAll('.food-item');
    //   let itemsFound = false;
    
    //   foodItems.forEach(item => {
    //     const itemName = item.querySelector('h4').innerText.toLowerCase();
    //     if (itemName.includes(searchInput)) {
    //       item.style.display = 'block';
    //       itemsFound = true;
    //     } else {
    //       item.style.display = 'none';
    //     }
    //   });
    
    //   const burgersHeading = document.querySelector('.mx-5');
    //   burgersHeading.style.display = 'block'; // Always show the category header
    
    //   const noItemsMessage = document.getElementById('no-items-message');
    //   if (itemsFound) {
    //     noItemsMessage.style.display = 'none';
    //   } else {
    //     noItemsMessage.style.display = 'block';
    //   }
    // }
    

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
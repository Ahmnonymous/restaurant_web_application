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


  // Cart Showing Code
  


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





    // Search Code
    function handleSearch(event) {
      if (event.keyCode === 13) { // Enter key pressed
        searchWithinPage();
        hideSearchInput();
      }
    }
    
    function searchWithinPage() {
      var searchQuery = document.getElementById("search-input").value.toLowerCase();
    
      // Remove previous highlighting
      removeHighlighting();
    
      // Traverse all text nodes within the page
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      while (walker.nextNode()) {
        var node = walker.currentNode;
        var text = node.nodeValue.toLowerCase();
        var index = text.indexOf(searchQuery);
    
        if (index !== -1) {
          var parentElement = node.parentElement;
          scrollToElement(parentElement);
          highlightWord(node, index, searchQuery);
          document.getElementById("search-input").value = ""; // Clear the search field
          return; // Stop searching after the first occurrence is found
        }
      }
    }
    
    function scrollToElement(element) {
      var topOffset = element.getBoundingClientRect().top;
      var bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      var elementTop = topOffset + bodyScrollTop;
      window.scrollTo({ top: elementTop - 100, behavior: "smooth" });
    }
    
    function highlightWord(node, index, searchQuery) {
      var range = document.createRange();
      var start = index;
      var end = index + searchQuery.length;
      range.setStart(node, start);
      range.setEnd(node, end);
      var span = document.createElement("span");
      span.classList.add("highlighted");
      range.surroundContents(span);
    }
    
    function removeHighlighting() {
      var highlightedElements = document.getElementsByClassName("highlighted");
      while (highlightedElements.length > 0) {
        var parentElement = highlightedElements[0].parentNode;
        parentElement.replaceChild(document.createTextNode(highlightedElements[0].textContent), highlightedElements[0]);
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
  
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', handlePrivilegeChange);
  });

  document.getElementById('changeButton').addEventListener('click', () => {
      document.getElementById('setButton').removeAttribute('disabled');
      resetCheckboxes();
  });

  // Handle privilege changes
  function handlePrivilegeChange(event) {
      const user = event.target.closest('.user-card').getAttribute('data-user');
      const privilege = event.target.getAttribute('name');
      const hasPrivilege = event.target.checked;

      const userCard = event.target.closest('.user-card');
      const privilegeItems = userCard.querySelectorAll('li');
      privilegeItems.forEach(item => {
          item.classList.remove('changed');
      });

      // Apply the 'changed' class to the changed privilege
      event.target.closest('li').classList.add('changed');

      console.log(`Admin changed privilege for ${user}: ${privilege} - ${hasPrivilege}`);
  }

  // Show an alert when the "Set" button is clicked
  document.getElementById('setButton').addEventListener('click', () => {
      // You can implement a logic to save the privilege changes to the backend here.
      // For now, we'll just show an alert to indicate that the role is assigned.
      alert('Role assigned! Privilege changes have been applied.');
  });

  function resetCheckboxes() {
      checkboxes.forEach(checkbox => {
          checkbox.checked = false;
      });
  }


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















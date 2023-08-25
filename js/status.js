import confetti from 'https://cdn.skypack.dev/canvas-confetti';

document.addEventListener("DOMContentLoaded", function () {
    const delay = 2000;
    setTimeout(() => {
        const ratingOverlay = document.getElementById("ratingoverlay");
        ratingOverlay.style.display = "block";
        animation();
    }, delay);
  });
  
function animation()
{
    confetti();
}
  
  
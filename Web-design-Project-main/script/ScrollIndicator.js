// Script for the progression bar
window.onscroll = function () {
    moveProgressBar();
};

// Function to move the progress bar based on scroll position
function moveProgressBar() {
    // Get the progress bar element by its ID
    const progressBar = document.getElementById('ScrollIndicator');
    
    // Determine the amount the user has scrolled both in pixels and as a percentage
    const winScroll = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // Set the width of the progress bar based on the calculated percentage
    progressBar.style.width = scrolled + '%';
}
  
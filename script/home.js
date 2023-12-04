let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" SlideDisplay", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " SlideDisplay";
}

// Variable to keep track of the active testimonial index
let testimonialIndex = 0;

// Initial testimonial display
changeTestimonial(0);

// Function to change the displayed testimonial based on the specified direction
function changeTestimonial(direction) {
  // Get the testimonials container and count
  const testimonials = document.querySelector('.testimonial-carousel');
  const testimonialsCount = testimonials.children.length;

  // Update the testimonial index based on the direction
  testimonialIndex += direction;

  // Handle wrapping when reaching the beginning or end of testimonials
  if (testimonialIndex < 0) {
    testimonialIndex = testimonialsCount - 1;
  } else if (testimonialIndex >= testimonialsCount) {
    testimonialIndex = 0;
  }

  // Hide all testimonials
  const allTestimonials = document.querySelectorAll('.testimonial');
  allTestimonials.forEach(testimonial => {
    testimonial.classList.remove('testimonial-active');
  });

  // Show the selected testimonial
  const selectedTestimonial = allTestimonials[testimonialIndex];
  selectedTestimonial.classList.add('testimonial-active');

  // Remove dot-tes-active from all dots
  const allDots = document.querySelectorAll('.dot-tes');
  allDots.forEach(dot => {
    dot.classList.remove('dot-tes-active');
  });

  // Add dot-tes-active to the corresponding dot
  const activeDot = document.querySelector(`.dot-tes:nth-child(${testimonialIndex + 1})`);
  if (activeDot) {
    activeDot.classList.add('dot-tes-active');
  }

  // Calculate the translation value for the testimonials container
  const translateValue = -testimonialIndex * 24.6 + '%';
  testimonials.style.transform = 'translateX(' + translateValue + ')';
}

// Function to change the testimonial based on the specified index
function currentTestimonial(n) {
  // Calculate the new index
  let newIndex = n - 1;

  // Check if the new index is different from the current index
  if (newIndex !== testimonialIndex) {
    // Determine the direction and number of steps to change the testimonial
    const direction = newIndex > testimonialIndex ? 1 : -1;
    const steps = Math.abs(newIndex - testimonialIndex);

    // Change the testimonial based on the direction and steps
    changeTestimonial(direction * steps);
  }
}

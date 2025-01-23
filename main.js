  //Slider Image
  document.addEventListener("DOMContentLoaded", function () {
    const slideContainer = document.querySelector(".slide-container")
    const slides = slideContainer.querySelectorAll(".slides img")
    const nextBtn = slideContainer.querySelector(".next")
    const prevBtn = slideContainer.querySelector(".prev")
    const dots = slideContainer.querySelectorAll(".dot")
  
    let currentSlide = 0
    let slideInterval
  
    window.switchImage = function (dotElement) {
      const targetIndex = parseInt(dotElement.getAttribute("attr"))
  
      // If clicking the current dot, do nothing
      if (targetIndex === currentSlide) return
  
      // Determine direction of slide
      const direction = targetIndex > currentSlide ? "next" : "prev"
  
      // Update current slide
      currentSlide = targetIndex
  
      // Show the slide
      showSlide(currentSlide, direction)
  
      // Reset auto-sliding
      stopAutoSlide()
      startAutoSlide()
    }
  
    // Function to show the current slide
    function showSlide(index, direction = "next") {
      // Remove active class from all slides
      slides.forEach((slide) => {
        slide.classList.remove("active")
      })
  
      // Add active class to current slide
      slides[index].classList.add("active")
  
      // Update dot indicators
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index)
      })
    }
  
    // Next slide function
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length
      showSlide(currentSlide, "next")
    }
  
    // Previous slide function
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length
      showSlide(currentSlide, "prev")
    }
  
    // Start auto-sliding
    function startAutoSlide() {
      slideInterval = setInterval(nextSlide, 6000)
    }
  
    // Stop auto-sliding
    function stopAutoSlide() {
      clearInterval(slideInterval)
    }
  
    // Event listeners for next and previous buttons
    nextBtn.addEventListener("click", () => {
      nextSlide()
      stopAutoSlide()
      startAutoSlide()
    })
  
    prevBtn.addEventListener("click", () => {
      prevSlide()
      stopAutoSlide()
      startAutoSlide()
    })
  
    // Pause on hover
    slideContainer.addEventListener("mouseenter", stopAutoSlide)
    slideContainer.addEventListener("mouseleave", startAutoSlide)
  
    // Initialize carousel
    showSlide(0)
    startAutoSlide()
  })

function updateCountdown(targetDate, ids) {
  const now = new Date().getTime();
  const distance = targetDate - now;
  
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  document.getElementById(ids.days).textContent = days.toString().padStart(2, '0');
  document.getElementById(ids.hours).textContent = hours.toString().padStart(2, '0');
  document.getElementById(ids.minutes).textContent = minutes.toString().padStart(2, '0');
  document.getElementById(ids.seconds).textContent = seconds.toString().padStart(2, '0');
}

//Target dates 
const ramadanDate = new Date('2025-03-01T00:00:00').getTime(); 
const muharramDate = new Date('2025-07-28T00:00:00').getTime(); 

// Update timers every second
setInterval(() => {
  updateCountdown(ramadanDate, {
    days: 'ramadan-days',
    hours: 'ramadan-hours',
    minutes: 'ramadan-minutes',
    seconds: 'ramadan-seconds'
  });
  
  updateCountdown(muharramDate, {
    days: 'muharram-days',
    hours: 'muharram-hours',
    minutes: 'muharram-minutes',
    seconds: 'muharram-seconds'
  });
}, 1000);


//Tabs
function openTab(evt, tabName) {
const tabs = document.querySelectorAll(".tab")
tabs.forEach((tab) => tab.classList.remove("active"))

const tablinks = document.querySelectorAll(".tablinks")
tablinks.forEach((link) => link.classList.remove("active"))

document.getElementById(tabName).classList.add("active")
evt.currentTarget.classList.add("active")
}

//Accordian
var acc = document.getElementsByClassName("accordion")
var i

for (i = 0; i < acc.length; i++) {
acc[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var panel = this.nextElementSibling;
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
    panel.style.padding = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
    panel.style.padding = "10px";
  } 
});
}

function initTheme() {
  const currentTheme = localStorage.getItem('siteTheme') || 'default';
  applyTheme(currentTheme);

  // Set the initial state of the toggle button if available
  const themeToggle = document.getElementById('theme-switcher');
  if (themeToggle) {
    themeToggle.checked = currentTheme === 'deuteranopia';
  }
}

function applyTheme(theme) {
  document.body.classList.remove('default', 'deuteranopia');
  document.body.classList.add(theme);

  // Update button icon or color
  const themeToggle = document.getElementById('theme-switcher');
  if (themeToggle) {
    themeToggle.style.backgroundColor = theme === 'deuteranopia' ? '#ffbf00' : '#2ab860';
  }
}

function toggleTheme() {
  const newTheme = document.body.classList.contains('default') ? 'deuteranopia' : 'default';
  localStorage.setItem('siteTheme', newTheme);
  applyTheme(newTheme);
}

// Add event listener to the theme switcher button
window.onload = function () {
  initTheme();
  const themeToggle = document.getElementById('theme-switcher');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
};
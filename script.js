// ============================================================
// SAFE GETTER
// ============================================================
function $(id) {
  return document.getElementById(id);
}

// Remove no-js fallback class
document.documentElement.classList.remove("no-js");

// ============================================================
// ELEMENT REFERENCES (all IDs exist in your HTML)
// ============================================================
const mobileBtn = $("mobileMenuBtn");
const mobileNav = $("mobileNav");
const heroBookBtn = $("heroBookBtn");
const langEnBtn = $("langEnBtn");
const langEsBtn = $("langEsBtn");
const darkToggleBtn = $("darkToggleBtn");

// ============================================================
// MOBILE NAVIGATION
// ============================================================
if (mobileBtn && mobileNav) {
  // Open/close menu
  mobileBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("mobile-nav--open");
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileNav.contains(e.target) && !mobileBtn.contains(e.target)) {
      mobileNav.classList.remove("mobile-nav--open");
    }
  });

  // Close when clicking a link
  document.querySelectorAll(".mobile-nav a").forEach(link => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("mobile-nav--open");
    });
  });
}

// ============================================================
// HERO BUTTON → SCROLL TO BOOKING
// ============================================================
function scrollToBooking() {
  const booking = $("booking");
  if (booking) booking.scrollIntoView({ behavior: "smooth" });
}

if (heroBookBtn) {
  heroBookBtn.addEventListener("click", scrollToBooking);
}

// ============================================================
// LANGUAGE SWITCHER
// ============================================================
function applyLanguage(lang) {
  document.querySelectorAll("[data-en]").forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.innerText = text;
  });
}

function setLanguage(lang) {
  localStorage.setItem("siteLanguage", lang);
  applyLanguage(lang);
}

if (langEnBtn) langEnBtn.addEventListener("click", () => setLanguage("en"));
if (langEsBtn) langEsBtn.addEventListener("click", () => setLanguage("es"));

// Load saved language
applyLanguage(localStorage.getItem("siteLanguage") || "en");

// ============================================================
// DARK MODE
// ============================================================
function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");
  const isDark = document.documentElement.classList.contains("dark");
  localStorage.setItem("darkMode", isDark ? "on" : "off");
}

if (darkToggleBtn) {
  darkToggleBtn.addEventListener("click", toggleDarkMode);
}

// Load saved dark mode
if (localStorage.getItem("darkMode") === "on") {
  document.documentElement.classList.add("dark");
}

// ============================================================
// SCROLL ANIMATIONS
// ============================================================
const animatedElements = document.querySelectorAll(
  ".section, .package-card, .about-card, .event-card, .testimonial, .gallery-grid img"
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    { threshold: 0.2 }
  );

  animatedElements.forEach(el => observer.observe(el));
} else {
  // Fallback for older browsers
  animatedElements.forEach(el => el.classList.add("fade-in"));
}

// ============================================================
// FOOTER YEAR
// ============================================================
const yearEl = $("year");
if (yearEl) {
  yearEl.innerText = new Date().getFullYear();
}

// ============================================================
// OPTIONAL FORM HANDLING
// ============================================================
document.querySelectorAll("form").forEach(form => {
  form.addEventListener("submit", e => {
    e.preventDefault();
    alert("Your message has been sent!");
    form.reset();
  });
});

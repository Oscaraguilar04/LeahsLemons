const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const bookingForm = document.querySelector("#booking-form");
const formNote = document.querySelector("#form-note");
const faqItems = document.querySelectorAll(".faq-item");
const carousel = document.querySelector("[data-carousel]");
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
}

faqItems.forEach((item) => {
  const button = item.querySelector("button");

  if (!button) return;

  button.addEventListener("click", () => {
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

if (carousel && prevButton && nextButton) {
  const slides = Array.from(carousel.querySelectorAll(".testimonial-card"));
  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));

  if (activeIndex < 0) activeIndex = 0;

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeIndex);
    });
  };

  prevButton.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => showSlide(activeIndex + 1));
}

if (bookingForm && formNote) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const getValue = (name) => String(formData.get(name) || "").trim();

    const name = getValue("name");
    const phone = getValue("phone");
    const email = getValue("email");
    const organization = getValue("organization");
    const eventType = getValue("eventType");
    const date = getValue("date");
    const attendance = getValue("attendance");
    const location = getValue("location");
    const contactMethod = getValue("contactMethod");
    const message = getValue("message");

    const subject = encodeURIComponent(`Booking request: ${eventType || "Event"} from ${name || "New customer"}`);
    const body = encodeURIComponent(
      [
        "Hi Leah's Lemons,",
        "",
        "I would like to request lemonade service for an event.",
        "",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Email: ${email}`,
        `Organization: ${organization || "N/A"}`,
        `Event Type: ${eventType}`,
        `Event Date: ${date || "TBD"}`,
        `Expected Attendance: ${attendance || "TBD"}`,
        `Location: ${location || "TBD"}`,
        `Preferred Contact Method: ${contactMethod}`,
        "",
        "Message:",
        message,
        "",
        "Please follow up with availability and next steps.",
      ].join("\n"),
    );

    window.location.href = `mailto:bookings@leahslemons.com?subject=${subject}&body=${body}`;
    formNote.textContent = "Your booking email is ready to send. Leah's Lemons will follow up with availability and event details.";
  });
}

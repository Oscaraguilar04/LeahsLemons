const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const bookingForm = document.querySelector("#booking-form");
const formNote = document.querySelector("#form-note");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (bookingForm && formNote) {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(bookingForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const eventType = String(formData.get("eventType") || "").trim();
    const date = String(formData.get("date") || "").trim();
    const guests = String(formData.get("guests") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const subject = encodeURIComponent(`Booking inquiry from ${name || "a new host"}`);
    const body = encodeURIComponent(
      [
        "Hi Leah's Lemons,",
        "",
        "I'd love to book you for an event.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Event type: ${eventType}`,
        `Event date: ${date || "Flexible / TBD"}`,
        `Guest count: ${guests || "TBD"}`,
        "",
        "Event vibe and details:",
        message,
      ].join("\n"),
    );

    window.location.href = `mailto:bookings@leahslemons.com?subject=${subject}&body=${body}`;
    formNote.textContent = "Your booking email is ready to send. We cannot wait to hear about your sunny event.";
  });
}

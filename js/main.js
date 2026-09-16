(function () {
  "use strict";

  // Sticky header shadow
  var header = document.getElementById("site-header");
  function onScroll() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile nav toggle
  var toggle = document.getElementById("nav-toggle");
  var links = document.getElementById("nav-links");
  function closeNav() {
    links.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  // Reveal-on-scroll
  var revealEls = document.querySelectorAll(".section-head, .service-card, .value-card, .why-list li");
  function revealObserver() {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      observer.observe(el);
    });
  }
  if ("IntersectionObserver" in window) {
    revealObserver();
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // Footer year
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Contact form (client-side only)
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !email || !message) {
        status.textContent = "Please fill in all required fields.";
        status.className = "form-status error";
        return;
      }
      if (!emailOk) {
        status.textContent = "Please enter a valid email address.";
        status.className = "form-status error";
        return;
      }

      // Build mailto fallback so the message reaches the team without a backend.
      var subject = encodeURIComponent("Project inquiry from " + name);
      var body = encodeURIComponent(
        "Name: " + name + "\n" +
        "Email: " + email + "\n" +
        "Service: " + form.service.value + "\n\n" +
        message
      );
      window.location.href = "mailto:hello@nandhtech.com?subject=" + subject + "&body=" + body;
      status.textContent = "Opening your email app... thanks for reaching out!";
      status.className = "form-status success";
      form.reset();
    });
  }
})();
// Luma Botanics — small interactions and GA4 event examples.
// GA4 events are sent only when a real Measurement ID replaces the placeholder.
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    });
  }

  // Product/service interaction: GA4 recommended ecommerce event select_item.
  document.querySelectorAll("[data-product]").forEach((button) => {
    button.addEventListener("click", () => {
      const productName = button.dataset.product || "Unknown product";
      const productPrice = Number(button.dataset.price || 0);
      if (typeof window.gtag === "function") {
        window.gtag("event", "select_item", {
          item_list_name: "Luma Botanics Collection",
          items: [{
            item_id: productName.toLowerCase().replaceAll(" ", "-"),
            item_name: productName,
            price: productPrice,
            quantity: 1
          }]
        });
      }
      button.classList.add("clicked");
      const original = button.innerHTML;
      button.innerHTML = "Added to your interest list ✓";
      window.setTimeout(() => {
        button.innerHTML = original;
        button.classList.remove("clicked");
      }, 1600);
    });
  });

  // Product category filters
  const filterButtons = document.querySelectorAll(".filter-button");
  const productCards = document.querySelectorAll(".shop-grid .product-card");
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      const category = filterButton.dataset.filter;
      filterButtons.forEach((button) => button.classList.toggle("active", button === filterButton));
      productCards.forEach((card) => {
        card.hidden = category !== "all" && card.dataset.category !== category;
      });
    });
  });

  // Demo forms: no backend, no email delivery, no actual mailing-list registration.
  document.querySelectorAll(".demo-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const formType = form.dataset.formType || "unknown";
      if (typeof window.gtag === "function") {
        window.gtag("event", "demo_form_submit", {
          form_type: formType,
          form_name: form.id || formType
        });
      }

      const feedback = form.querySelector(".form-feedback") || form.parentElement.querySelector(".form-feedback");
      if (feedback) {
        feedback.textContent = formType === "contact"
          ? "Thanks! Your demo form passed validation. No message was sent."
          : "Thanks! Your demo subscription was validated. You have not been added to a mailing list.";
      }
      form.reset();
    });
  });
});

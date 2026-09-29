const filterButtons = [...document.querySelectorAll(".filter-button")];
const productCards = [...document.querySelectorAll(".product-card")];
const searchInput = document.querySelector("#flower-search");
const emptyState = document.querySelector(".empty-state");
let activeFilter = "all";

function filterProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.name.toLowerCase().includes(searchTerm);
    const isVisible = matchesCategory && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("is-active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });
    filterProducts();
  });
});

if (searchInput) searchInput.addEventListener("input", filterProducts);

document.querySelector("#newsletter-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = document.querySelector(".form-message");
  message.textContent = "You're on the list. Talk soon!";
  event.currentTarget.reset();
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open menu" : "Close menu");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    navigation.classList.remove("is-open");
  });
});

// Select Buttons "Add to Cart"
const addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    e.preventDefault();

    const productId = this.getAttribute("data-product-id"); // بتحدد المنتج اللي بتتعامل معاه
    const productCard = this.closest(".card-border"); // اقرب عنصر له class
    const productName =
      productCard?.querySelector(".title")?.textContent || "Unknown Product";
    const productPrice =
      productCard?.querySelector(".price")?.textContent || "$0.00";
    const productImage = productCard?.querySelector("img")?.src || "";

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: productId,
        name: productName,
        price: productPrice,
        image: productImage,
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount(); // تحديث عدد العناصر في السلة
    alert(`${productName} has been added to your cart!`);
  });
});

// تحديث عدد العناصر في السلة
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }
}

// Dark Mode
const themeToggle = document.getElementById("theme-toggle");
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

// Search Bar
function goToSection() {
  const searchValue = document.getElementById("search").value.trim(); // بتجيب قيمه العنصر وتمسح المسافات

  const validSections = ["Men's Section", "Women's Section", "Kids' Section"];
  // لو القيمه موجوده فعلا اعمل كذا
  if (validSections.includes(searchValue)) {
    const section = document.getElementById(searchValue);
    // هل القيمه اللي دخلها اليوزر صح ؟
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    alert("Section not found. Please select Men, Women, or Kids.");
  }
}
document.getElementById("searchIcon").addEventListener("click", goToSection);

// عشان تخلي ال cart-count زي مهو لو عملت ريفرش مثلا
updateCartCount();

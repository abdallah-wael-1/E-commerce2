let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = 0;

cart.forEach((item) => {
  const itemPrice = parseFloat(item.price.replace("$", "")) * item.quantity;
  totalPrice += itemPrice;
  const row = document.createElement("tr");
  row.innerHTML = `
    <td><img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; border-radius: 8px; object-fit: cover;"></td>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td>
      <button class="decrease" data-product-id="${item.id}">-</button>
      <span class="quantity">${item.quantity}</span>
      <button class="increase" data-product-id="${item.id}">+</button>
    </td>
    <td><button class="delete-btn" data-product-id="${item.id}"><i class="fa-solid fa-trash-can"></i></button></td>
  `;
  document.getElementById("cart-items").appendChild(row);
});
// Convert 12.0 --> $12.00
document.querySelector(
  ".sub p:last-child"
).textContent = `$${totalPrice.toFixed(2)}`;
const clearCartBtn = document.querySelector(".clear");
clearCartBtn?.addEventListener("click", () => {
  const isConfirmed = confirm("Are you sure you want to clear the cart?");
  // لو اليوزر عايز يريموف فعلا ؟
  if (isConfirmed) {
    // Ok = Remove Items
    localStorage.removeItem("cart");
    window.location.reload(); // إعادة تحميل الصفحة
  }
});

const decreaseButtons = document.querySelectorAll(".decrease");
decreaseButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const productId = e.target.dataset.productId;
    // بتتاكد من id العنصر
    const product = cart.find((item) => item.id == productId);
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      // هيشيل العنصر من الكارت
      cart = cart.filter((item) => item.id != productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  });
});

const increaseButtons = document.querySelectorAll(".increase");
increaseButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const productId = e.target.dataset.productId;
    const product = cart.find((item) => item.id == productId);
    product.quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.reload();
  });
});

// تعديل زر Delete عشان ينقص الكمية واحدة واحدة
const deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    // الحصول على الـ productId من الزر
    const productId = e.target.dataset.productId;

    // تأكد من أن الـ productId موجود
    if (productId) {
      // حذف العنصر بالكامل من السلة باستخدام الـ filter
      cart = cart.filter((item) => item.id != productId);

      // حفظ السلة المحدثة في localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // إعادة تحميل الصفحة لعرض التغييرات
      window.location.reload();
    }
  });
});

const checkoutButton = document.querySelector(".chekout");
checkoutButton?.addEventListener("click", () => {
  if (cart.length > 0) {
    // حساب الإجمالي
    let totalPrice = 0;
    cart.forEach((item) => {
      const itemPrice = parseFloat(item.price.replace("$", "")) * item.quantity;
      totalPrice += itemPrice;
    });
    // عرض رسالة تأكيد بالإجمالي
    const confirmPurchase = confirm(
      `Your total is $${totalPrice.toFixed(
        2
      )}. Do you want to confirm your purchase?`
    );
    if (confirmPurchase) {
      // إفراغ السلة
      localStorage.removeItem("cart");
      alert("Thank you for your purchase! Your order has been confirmed.");
      window.location.href = "../Shop/shop.html";
    }
  } else {
    alert("Your cart is empty! Please add items to proceed.");
  }
});

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
updateCartCount();

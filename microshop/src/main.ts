import './style.css'

// const cartCountEl = document.getElementById("cart-count");
// const buttons = document.querySelectorAll<HTMLButtonElement>(".add-to-cart");
// const addedProduct = document.querySelector

// // Downloading data from localStorage
// let cartCount: number = parseInt(localStorage.getItem("cartCount") || "0");
// if (cartCountEl) {
//   cartCountEl.textContent = cartCount.toString();
  
// }


// // Click handlers
// buttons.forEach(button => {
//   button.addEventListener("click", () => {
//     cartCount++;
//     if (cartCountEl) {
//       cartCountEl.textContent = cartCount.toString();
//     }
//     localStorage.setItem("cartCount", cartCount.toString());
//   });
// });

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

// Products
const products: Product[] = [
  { id: 1, title: "Товар 1", description: "Описание товара 1", price: 1000, image: "https://placehold.co/200x200" },
  { id: 2, title: "Товар 2", description: "Описание товара 2", price: 1500, image: "https://placehold.co/200x200" },
  { id: 3, title: "Товар 3", description: "Описание товара 3", price: 2000, image: "https://placehold.co/200x200" },
  { id: 3, title: "Товар 4", description: "Описание товара 4", price: 2000, image: "https://placehold.co/200x200" },
];

// DOM-elements
const cartCountEl = document.getElementById("cart-count");
const resetBtn = document.getElementById("reset-cart");
const showCartBtn = document.getElementById("show-cart");
const productsContainer = document.getElementById("products");
const cartList = document.getElementById("cart-list");

// Downloading cart data from localStorage
let cartItems: Product[] = JSON.parse(localStorage.getItem("cartItems") ?? "[]");
let cartCount: number = cartItems.length;

if (cartCountEl) {
  cartCountEl.textContent = cartCount.toString();
}

// Cards rendering function
function renderProducts(items: Product[]) {
  if (!productsContainer) return;
  productsContainer.innerHTML = "";

  items.forEach(product => {
    const card = document.createElement("div");
    card.className = "card";

    // Image
    const img = document.createElement("img");
    img.src = product.image;
    img.alt = product.title;

    // Header
    const h3 = document.createElement("h3");
    h3.textContent = product.title;

    // Description
    const p = document.createElement("p");
    p.textContent = product.description;

    // Price
    const price = document.createElement("div");
    price.className = "price";
    price.textContent = `${product.price} $`;

    // Button
    const button = document.createElement("button");
    button.className = "btn add-to-cart";
    button.dataset.id = product.id.toString();
    button.textContent = "В корзину";

    // Card assembly
    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(price);
    card.appendChild(button);

    productsContainer.appendChild(card);

    // Add to cart (EVENT)
    button.addEventListener("click", () => {
      cartItems.push(product);
      cartCount++;
      if (cartCountEl) cartCountEl.textContent = cartCount.toString();
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    });
  });
}

// Render cart function
function renderCart() {
  if (!cartList) return;
  cartList.innerHTML = "";

  if (cartItems.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Корзина пуста";
    cartList.appendChild(emptyMsg);
  } else {
    cartItems.forEach(item => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.textContent = `${item.title} — ${item.price} ₽`;
      cartList.appendChild(div);
    });
  }
}

// Show cart (EVENT)
showCartBtn?.addEventListener("click", () => {
  if (!cartList || !showCartBtn) return;

  cartList.classList.toggle("active");

  if (cartList.classList.contains("active")) {
    showCartBtn.textContent = "Скрыть корзину";
  } else {
    showCartBtn.textContent = "Показать корзину";
  }

  renderCart();
});

// Clear the cart
resetBtn?.addEventListener("click", () => {
  cartItems = [];
  cartCount = 0;
  if (cartCountEl) cartCountEl.textContent = "0";
  localStorage.removeItem("cartItems");
  renderCart();
});

// Products rendering
renderProducts(products);

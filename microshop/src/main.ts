import './style.css'
import { products } from './products';

// Type for products
type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

// DOM-elements
const cartCountEl = document.querySelector<HTMLElement>("#cart-count");
const resetBtn = document.querySelector<HTMLButtonElement>("#reset-cart");
const showCartBtn = document.querySelector<HTMLButtonElement>("#show-cart");
const productsContainer = document.querySelector<HTMLElement>("#products");
const cartList = document.querySelector<HTMLButtonElement>("#cart-list");

// Downloading cart data from localStorage
let cartItems: Product[] = JSON.parse(localStorage.getItem("cartItems") ?? "[]");
let cartCount: number = cartItems.length;

// Updating cart's counter "function"
function updateCartCountEl() {
  if (cartCountEl) {
    cartCountEl.textContent = cartCount.toString();
  }
}

// Cards rendering function
function renderProducts(items: Product[]) {
  if (!productsContainer) return;
  productsContainer.innerHTML = "";

  items.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    // Image
    const img = document.createElement("img");
    img.classList.add("card-img");
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
    price.classList.add("price");
    price.textContent = `$${product.price}`;

    // Button
    const button = document.createElement("button");
    button.classList.add("btn add-to-cart");
    button.dataset.id = product.id.toString();
    button.textContent = "В корзину";

    // Add to cart (EVENT)
    button.addEventListener("click", () => addToCart(product));

    // Card assembly
    card.appendChild(img);
    card.appendChild(h3);
    card.appendChild(p);
    card.appendChild(price);
    card.appendChild(button);

    productsContainer.appendChild(card);

    // Add to cart function
    function addToCart(product: Product) {
      cartItems.push(product);
      cartCount++;
      updateCartCountEl();
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      renderCart();
      
    }
  });
}

// Cart rendering function
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
      div.classList.add("cart-item");
      div.textContent = `${item.title} — $${item.price}`;
      cartList.appendChild(div);
    });
  }
}

// Show/hide cart function
function showCart() {
  if (!cartList || !showCartBtn) return;

  const isActive = cartList.classList.toggle("active");
  showCartBtn.textContent = isActive ? "Скрыть корзину" : "Показать корзину";

  renderCart();
}

// Show/hide cart (EVENT)
showCartBtn?.addEventListener("click", showCart);

// Clear the cart
resetBtn?.addEventListener("click", () => {
  cartItems = [];
  cartCount = 0;
  if (cartCountEl) cartCountEl.textContent = "0";
  localStorage.removeItem("cartItems");
  renderCart();
});


// Products rendering
updateCartCountEl();  // Updating cart's counter
renderProducts(products);



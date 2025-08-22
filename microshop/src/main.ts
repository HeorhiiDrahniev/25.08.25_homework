import './style.css'

const cartCountEl = document.getElementById("cart-count") as HTMLElement;
const buttons = document.querySelectorAll<HTMLButtonElement>(".add-to-cart");

// Загружаем сохранённое значение из localStorage
let cartCount: number = parseInt(localStorage.getItem("cartCount") || "0");
cartCountEl.textContent = cartCount.toString();

// Обработчики кликов
buttons.forEach(button => {
  button.addEventListener("click", () => {
    cartCount++;
    cartCountEl.textContent = cartCount.toString();
    localStorage.setItem("cartCount", cartCount.toString());
  });
});
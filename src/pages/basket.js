import createPageContainer from '../createpagecontainer.js';
import { cart, clearCart } from '../cartsystem.js';


export default function Basket(carttt) {
    const items = carttt || cart;
    console.log(items);
    const container = createPageContainer();

  if (!container) return;

  container.innerHTML = '';

  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML = `
      <h2 style="padding: 10px;">Your Basket</h2>
      <p style="padding: 10px;">Your basket is empty</p>
      <a href="#/shop" class="btn btn-sm btn-primary" style="margin: 10px;">Continue Shopping</a>`;
    return;
  }

  // Calculate total
  let total = 0;
  items.forEach(item => {
    total += item.pricecart;
  });

  container.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-4">
      <h2 class="text-2xl font-bold mb-4">Your Basket</h2>
    </div>
    <div id="basket-items" class="flex flex-col gap-3 px-4 pb-4 max-w-4xl mx-auto"></div>
    <div class="max-w-4xl mx-auto px-4 py-4">
      <div class="flex justify-between items-center mb-4">
        <span id="basket-total" class="text-xl font-bold">Total: $${total.toFixed(2)}</span>
        <button class="btn btn-primary checkout-btn">Checkout</button>
      </div>
    </div>`;

  const basketItems = container.querySelector('#basket-items');

  function updateTotal() {
    let newTotal = 0;
    items.forEach(i => { newTotal += i.pricecart; });
    const totalSpan = container.querySelector('#basket-total');
    if (totalSpan) totalSpan.textContent = `Total: $${newTotal.toFixed(2)}`;
  }

  items.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('flex', 'flex-row', 'bg-base-100', 'shadow-sm', 'rounded-lg', 'overflow-hidden', 'hover:shadow-md', 'transition-shadow');
    itemDiv.innerHTML = `
      <div class="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0">
        <img src="${import.meta.env.BASE_URL}${item.image}" alt="${item.name}" class="w-full h-full object-cover rounded-l-lg" />
      </div>
      <div class="flex-1 p-3 sm:p-4 flex flex-col justify-between gap-2">
        <div class="flex-1">
          <h2 class="font-bold text-base sm:text-lg mb-1">${item.name}</h2>
          <p class="text-xs sm:text-sm text-base-content/70 line-clamp-2 mb-1">${item.description}</p>
          <p class="text-xs sm:text-sm text-base-content/70">Unit: $${item.price}</p>
        </div>
        <div class="flex flex-row items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <button class="btn btn-circle btn-sm sm:btn-md minus w-7 h-7 sm:w-10 sm:h-10 min-h-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <span class="px-3 sm:px-4 text-sm sm:text-base font-semibold qty min-w-[2rem] text-center">${item.countercart}</span>
            <button class="btn btn-circle btn-sm sm:btn-md plus w-7 h-7 sm:w-10 sm:h-10 min-h-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-base sm:text-lg subtotal">$${item.pricecart.toFixed(2)}</span>
            <button class="btn btn-xs sm:btn-sm btn-error remove whitespace-nowrap">Remove</button>
          </div>
        </div>
      </div>
    `;

    const minusBtn = itemDiv.querySelector('.minus');
    const plusBtn = itemDiv.querySelector('.plus');
    const qtySpan = itemDiv.querySelector('.qty');
    const subtotalSpan = itemDiv.querySelector('.subtotal');
    const removeBtn = itemDiv.querySelector('.remove');

    plusBtn.addEventListener('click', () => {
      item.countercart++;
      item.pricecart = item.countercart * parseFloat(item.price);
      qtySpan.textContent = item.countercart;
      subtotalSpan.textContent = `$${item.pricecart.toFixed(2)}`;
      updateTotal();
    });

    minusBtn.addEventListener('click', () => {
      if (item.countercart > 1) {
        item.countercart--;
        item.pricecart = item.countercart * parseFloat(item.price);
        qtySpan.textContent = item.countercart;
        subtotalSpan.textContent = `$${item.pricecart.toFixed(2)}`;
        updateTotal();
      }
    });

    removeBtn.addEventListener('click', () => {
      const index = cart.indexOf(item);
      if (index > -1) {
        cart.splice(index, 1);
      }
      item.countercart = 0;
      item.pricecart = 0;
      Basket(); // Re-render basket
    });

    basketItems.appendChild(itemDiv);
  });

  // Checkout button handler
  const checkoutBtn = container.querySelector('.checkout-btn');
  checkoutBtn.addEventListener('click', () => {
    clearCart();
    container.innerHTML = `
      <div class="p-8 text-center">
        <h2 class="text-2xl font-bold mb-4">Thank you for your order!</h2>
        <p class="mb-4">Your order has been placed successfully.</p>
        <a href="#/shop" class="btn btn-primary">Continue Shopping</a>
      </div>`;
  });
}
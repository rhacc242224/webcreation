import createPageContainer from '../../createpagecontainer.js';
import { cart, ShopItem } from '../../cartsystem.js';
import { jsonInit } from './itemcards.js';



export default function Shop() {
  let container = createPageContainer();
  container.innerHTML = "";
  container.innerHTML = `

<!-- Parallax Strobe Background -->
<div class="fixed top-0 left-0 w-full h-screen -z-10">
  <div class="relative w-full h-full">
    <!-- Red channel -->
    <img
      id="strobe-bg-r"
      class="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen"
      alt="Background"
      style="filter: sepia(100%) hue-rotate(-30deg) saturate(400%);"
    />
    <!-- Green channel -->
    <img
      id="strobe-bg-g"
      class="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen"
      alt="Background"
      style="filter: sepia(100%) hue-rotate(60deg) saturate(400%);"
    />
    <!-- Blue channel -->
    <img
      id="strobe-bg-b"
      class="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen"
      alt="Background"
      style="filter: sepia(100%) hue-rotate(180deg) saturate(400%);"
    />
  </div>
  <div id="overlay-layer" class="absolute inset-0 bg-base-200 backdrop-blur-sm transition-opacity duration-300" style="opacity: 0.8;"></div>
</div>

<!-- Overlay Opacity Control -->
<div class="max-w-4xl mx-auto px-4 pt-4">
  <div class="flex items-center gap-3 bg-base-100 rounded-lg p-3 shadow-sm">
    <label class="text-sm font-semibold whitespace-nowrap">Strobe Intensity:</label>
    <input
      type="range"
      id="overlay-slider"
      min="0"
      max="100"
      value="80"
      class="range range-sm range-primary flex-1"
    />
    <span id="opacity-value" class="text-sm font-mono min-w-[3rem] text-right">80%</span>
  </div>
</div>

<div id="filters" class="max-w-4xl mx-auto px-4 py-6">
  <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
    <div class="flex-1">
      <input
        type="text"
        id="search-bar"
        placeholder="Search for empanadas, sauces..."
        class="input input-bordered w-full"
      />
    </div>
    <div class="w-full sm:w-auto sm:min-w-[200px]">
      <select id="category-filter" class="select select-bordered w-full">
        <option value='all' id='all'>All Categories</option>
      </select>
    </div>
  </div>
</div>

<div id='product-list' class='flex flex-col gap-3 px-4 pb-4 max-w-4xl mx-auto relative z-10'></div>`;

  // Overlay opacity slider control with image effects
  const overlaySlider = document.getElementById('overlay-slider');
  const overlayLayer = document.getElementById('overlay-layer');
  const opacityValue = document.getElementById('opacity-value');

  if (overlaySlider && overlayLayer && opacityValue) {
    overlaySlider.addEventListener('input', (e) => {
      const value = parseInt(e.target.value);
      const opacity = value / 100;

      // Update overlay opacity
      overlayLayer.style.opacity = opacity;
      opacityValue.textContent = `${value}%`;

      // Apply effects to strobe background RGB channels with chromatic aberration
      const strobeBgR = document.getElementById('strobe-bg-r');
      const strobeBgG = document.getElementById('strobe-bg-g');
      const strobeBgB = document.getElementById('strobe-bg-b');

      if (strobeBgR && strobeBgG && strobeBgB) {
        if (value <= 20) {
          // Low values: maximum aberration, pixelated, desaturated
          const aberration = 20 - value; // Max aberration at 0
          const saturation = value * 5; // 0% at slider=0, 100% at slider=20

          // Apply chromatic aberration offset
          strobeBgR.style.transform = `translate(-${aberration * 0.5}px, 0) scale(1.02)`;
          strobeBgG.style.transform = `translate(0, 0) scale(1.02)`;
          strobeBgB.style.transform = `translate(${aberration * 0.5}px, 0) scale(1.02)`;

          // Apply effects to all channels
          [strobeBgR, strobeBgG, strobeBgB].forEach(img => {
            img.style.opacity = '0.8';
            img.style.imageRendering = 'pixelated';
          });

          // Adjust color separation based on saturation
          strobeBgR.style.filter = `sepia(100%) hue-rotate(-30deg) saturate(${300 + saturation * 3}%) contrast(80%)`;
          strobeBgG.style.filter = `sepia(100%) hue-rotate(60deg) saturate(${300 + saturation * 3}%) contrast(80%)`;
          strobeBgB.style.filter = `sepia(100%) hue-rotate(180deg) saturate(${300 + saturation * 3}%) contrast(80%)`;
        } else {
          // Higher values: reduced aberration, normal rendering
          const imageOpacity = 0.15 + (value - 20) * 0.005;
          const aberration = Math.max(0, (40 - value) * 0.2); // Gradual reduction

          strobeBgR.style.transform = `translate(-${aberration}px, 0) scale(1)`;
          strobeBgG.style.transform = `translate(0, 0) scale(1)`;
          strobeBgB.style.transform = `translate(${aberration}px, 0) scale(1)`;

          [strobeBgR, strobeBgG, strobeBgB].forEach(img => {
            img.style.opacity = Math.min(imageOpacity, 0.3).toString();
            img.style.imageRendering = 'auto';
          });

          strobeBgR.style.filter = 'sepia(100%) hue-rotate(-30deg) saturate(400%) contrast(100%)';
          strobeBgG.style.filter = 'sepia(100%) hue-rotate(60deg) saturate(400%) contrast(100%)';
          strobeBgB.style.filter = 'sepia(100%) hue-rotate(180deg) saturate(400%) contrast(100%)';
        }
      }
    });
  }

  // Initialize strobe effect for background
  fetch(import.meta.env.BASE_URL + "shopitems.json")
    .then(res => res.json())
    .then(data => {
      const shopItems = data["Shop Items"];
      const allImages = [];

      // Collect all product images
      for (let category in shopItems) {
        shopItems[category].forEach(item => {
          if (item.image) {
            allImages.push(import.meta.env.BASE_URL + item.image);
          }
        });
      }

      // Strobe effect for background RGB channels
      const strobeBgR = document.getElementById('strobe-bg-r');
      const strobeBgG = document.getElementById('strobe-bg-g');
      const strobeBgB = document.getElementById('strobe-bg-b');
      let currentIndex = 0;

      if (allImages.length > 0 && strobeBgR && strobeBgG && strobeBgB) {
        // Set initial image for all channels
        strobeBgR.src = allImages[0];
        strobeBgG.src = allImages[0];
        strobeBgB.src = allImages[0];

        // Update all channels simultaneously
        setInterval(() => {
          currentIndex = (currentIndex + 1) % allImages.length;
          strobeBgR.src = allImages[currentIndex];
          strobeBgG.src = allImages[currentIndex];
          strobeBgB.src = allImages[currentIndex];
        }, 150);
      }
    })
    .catch(error => {
      console.error('Error loading background images:', error);
    });

const optionlist = document.getElementById('category-filter');
const allItems = [];
jsonInit().then(shopItems => {
    
  for (let category in shopItems) {
        const catfilter = document.createElement('option');
        catfilter.value = category;
        catfilter.textContent = `${category}`;
        catfilter.id = category;
        optionlist.appendChild(catfilter);

        shopItems[category].forEach(itemData => {
        const item = new ShopItem(itemData);
        console.log(item);

        
        allItems.push(item);  // Store all ShopItem instances for later use
        renderItems(allItems); 


        
    });
}

    // Set up the filter by category
    setupFilter(shopItems, allItems);

    


    let searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('keyup', (e) => {
      const searchTerm = e.target.value.toLowerCase();  // Get the search term in lowercase
      searchFilter(allItems, searchTerm);  // Filter products by search term
    });
});


    
function searchFilter(allItems, searchTerm) {
    const filteredItems = allItems.filter(item => 
      item.name.toLowerCase().includes(searchTerm) || 
      item.description.toLowerCase().includes(searchTerm)
    );
    renderItems(filteredItems); 
    console.log(filteredItems) // Render the filtered items
  }


function setupFilter(shopItems, allItems) {
  const categoryFilter = document.getElementById('category-filter');
  
  // Add an event listener for the change event to track the selected category
  categoryFilter.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;  // Get the selected category
    filterProducts(shopItems, allItems, selectedCategory);  // Filter and display the items based on the selected category
  });
}

function filterProducts(shopItems, allItems, selectedCategory = 'all') {
    let filteredItems = [];
    
    // If 'all' is selected, show all items, else filter by category
    if (selectedCategory === 'all') {
      filteredItems = allItems;
    } else {
      filteredItems = allItems.filter(item => item.category === selectedCategory);
    }
    renderItems(filteredItems);  // Render filtered items
  }

function renderItems(filteredItems) {
  const productList = document.getElementById('product-list');
    productList.innerHTML = '';
  if (filteredItems.length === 0) {
    productList.innerHTML = '<p>No products available in this category.</p>';
  } else {
    filteredItems.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('flex', 'flex-row', 'bg-base-100', 'shadow-sm', 'rounded-lg', 'overflow-visible', 'hover:shadow-md', 'transition-shadow', 'relative');
      itemDiv.innerHTML = `
        <div class="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0">
          <img src="${import.meta.env.BASE_URL}${item.image}" alt="${item.name}" class="w-full h-full object-cover rounded-l-lg" />
        </div>
        <div class="flex-1 p-3 sm:p-4 flex flex-col justify-between gap-2 pr-12 sm:pr-16">
          <div class="flex-1">
            <h2 class="font-bold text-base sm:text-lg mb-1">${item.name}</h2>
            <p class="text-xs sm:text-sm text-base-content/70 line-clamp-2 mb-1 sm:mb-2">${item.description}</p>
            <p class="font-bold text-base sm:text-lg">$${item.price}</p>
          </div>
          <div class="flex flex-row items-center gap-2">
            <button class="btn btn-circle btn-sm sm:btn-md minus w-7 h-7 sm:w-10 sm:h-10 min-h-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <span class="px-3 sm:px-4 text-sm sm:text-base font-semibold qty min-w-[2rem] text-center">${item.counter}</span>
            <button class="btn btn-circle btn-sm sm:btn-md plus w-7 h-7 sm:w-10 sm:h-10 min-h-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
        </div>
        <button class="btn btn-circle btn-primary add absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 min-h-0 shadow-lg hover:shadow-xl transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </button>
      `;

      const minusBtn = itemDiv.querySelector('.minus');
    const plusBtn = itemDiv.querySelector('.plus');
    const qtySpan = itemDiv.querySelector('.qty');
    const addBtn = itemDiv.querySelector('.add');
    // Increment counter
    plusBtn.addEventListener('click', () => {
      item.increase();
      qtySpan.textContent = item.counter; // Update display
    });

    // Decrement counter

    minusBtn.addEventListener('click', () => {
      item.decrease();
      qtySpan.textContent = item.counter; // Update display
    });

    addBtn.addEventListener('click', () => {
  item.addcart();
  if (!cart.includes(item)) {
    cart.push(item);
  }
  qtySpan.textContent = item.counter; // Reset display after adding to cart
});

      
      productList.appendChild(itemDiv);
      


    });
  }
}
    
// inside your Shop / Layout render
}



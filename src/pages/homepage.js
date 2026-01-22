import { routes, router, addListener } from '../router.js';
import createPageContainer from '../createpagecontainer.js';

export default function Home() {
  const container = createPageContainer();
  container.innerHTML = `
    <div class="w-full h-64 sm:h-96 relative overflow-hidden bg-base-200 rounded-lg shadow-xl">
      <img
        id="strobe-image"
        class="w-full h-full object-cover transition-opacity duration-75"
        alt="Product showcase"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
        <div class="p-6 sm:p-8 text-white">
          <h1 class="text-3xl sm:text-5xl font-bold mb-2">Las Marias</h1>
          <p class="text-lg sm:text-xl">Authentic Argentine Empanadas & More</p>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-4 py-8 text-center">
      <a href="#/shop" class="btn btn-primary btn-lg">Browse Our Menu</a>
    </div>
  `;

  // Fetch all product images and create strobe effect
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

      // Strobe effect: rapidly cycle through images
      const strobeImage = document.getElementById('strobe-image');
      let currentIndex = 0;

      if (allImages.length > 0 && strobeImage) {
        // Set initial image
        strobeImage.src = allImages[0];

        // Rapid strobe effect (changes every 150ms)
        setInterval(() => {
          currentIndex = (currentIndex + 1) % allImages.length;
          strobeImage.src = allImages[currentIndex];
        }, 150);
      }
    })
    .catch(error => {
      console.error('Error loading product images:', error);
    });
}

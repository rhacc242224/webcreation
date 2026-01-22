import { routes, router, addListener } from '../router.js';
import createPageContainer from '../createpagecontainer.js';

export default function About() {
  const container = createPageContainer();
  container.innerHTML = `
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">About Us</h1>
      <div class="bg-base-100 shadow-sm rounded-lg p-6 sm:p-8">
        <div class="prose max-w-none">
          <p class="text-base sm:text-lg leading-relaxed mb-4">
            Las Marias is a family-owned business that takes pride in crafting top-quality, handcrafted food inspired by Argentine and Latin-American recipes. We have a genuine passion for our products, and we sincerely hope that you will recognize and relish their superior quality.
          </p>
          <p class="text-base sm:text-lg leading-relaxed">
            Our primary avenue for sales is through our online store. Our business, Las Marias Argentine Deli LTD, is registered in the U.K.
          </p>
        </div>
      </div>
    </div>
  `;
}
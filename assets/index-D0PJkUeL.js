(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))p(r);new MutationObserver(r=>{for(const l of r)if(l.type==="childList")for(const g of l.addedNodes)g.tagName==="LINK"&&g.rel==="modulepreload"&&p(g)}).observe(document,{childList:!0,subtree:!0});function d(r){const l={};return r.integrity&&(l.integrity=r.integrity),r.referrerPolicy&&(l.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?l.credentials="include":r.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function p(r){if(r.ep)return;r.ep=!0;const l=d(r);fetch(r.href,l)}})();function y(){let o=document.getElementById("wrap");return o||(o=document.createElement("div"),o.id="wrap",o.className="page",document.getElementById("app").appendChild(o)),o}const v=[];class k{constructor(n){Object.assign(this,n),this.countercart=0,this.counter=0,this.pricecart=0}info(){return`${this.name} - ${this.price} | ${this.description}`}increase(){return this.counter++,console.log(this.counter),`${this.counter}`}decrease(){return this.counter>0&&this.counter--,console.log(this.counter),`${this.counter}`}addcart(){if(this.counter>0)return this.pricecart+=this.counter*parseInt(this.price),this.countercart+=this.counter,this.counter=0,console.log(this.pricecart),console.log(v),`${this.counter}`}removeCart(){if(this.countercart>0){this.countercart--,this.pricecart-=this.price;let n=document.getElementById("cartcount");n&&(n=this.countercart)}}}function I(){v.length=0}function w(){const o=y();o.innerHTML=`
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
  `,fetch("/webcreation/shopitems.json").then(n=>n.json()).then(n=>{const d=n["Shop Items"],p=[];for(let g in d)d[g].forEach(s=>{s.image&&p.push("/webcreation/"+s.image)});const r=document.getElementById("strobe-image");let l=0;p.length>0&&r&&(r.src=p[0],setInterval(()=>{l=(l+1)%p.length,r.src=p[l]},150))}).catch(n=>{console.error("Error loading product images:",n)})}function $(){return fetch("/webcreation/shopitems.json").then(o=>o.json()).then(o=>{const n=o["Shop Items"];console.log(n);for(let d in n)return n[d].map(r=>new k(r)).forEach(r=>{console.log(" "+r.info())}),n})}function C(){let o=y();o.innerHTML="",o.innerHTML=`

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

<div id='product-list' class='flex flex-col gap-3 px-4 pb-4 max-w-4xl mx-auto relative z-10'></div>`;const n=document.getElementById("overlay-slider"),d=document.getElementById("overlay-layer"),p=document.getElementById("opacity-value");n&&d&&p&&n.addEventListener("input",i=>{const a=parseInt(i.target.value),e=a/100;d.style.opacity=e,p.textContent=`${a}%`;const t=document.getElementById("strobe-bg-r"),c=document.getElementById("strobe-bg-g"),u=document.getElementById("strobe-bg-b");if(t&&c&&u)if(a<=20){const m=20-a,b=a*5;t.style.transform=`translate(-${m*.5}px, 0) scale(1.02)`,c.style.transform="translate(0, 0) scale(1.02)",u.style.transform=`translate(${m*.5}px, 0) scale(1.02)`,[t,c,u].forEach(f=>{f.style.opacity="0.8",f.style.imageRendering="pixelated"}),t.style.filter=`sepia(100%) hue-rotate(-30deg) saturate(${300+b*3}%) contrast(80%)`,c.style.filter=`sepia(100%) hue-rotate(60deg) saturate(${300+b*3}%) contrast(80%)`,u.style.filter=`sepia(100%) hue-rotate(180deg) saturate(${300+b*3}%) contrast(80%)`}else{const m=.15+(a-20)*.005,b=Math.max(0,(40-a)*.2);t.style.transform=`translate(-${b}px, 0) scale(1)`,c.style.transform="translate(0, 0) scale(1)",u.style.transform=`translate(${b}px, 0) scale(1)`,[t,c,u].forEach(f=>{f.style.opacity=Math.min(m,.3).toString(),f.style.imageRendering="auto"}),t.style.filter="sepia(100%) hue-rotate(-30deg) saturate(400%) contrast(100%)",c.style.filter="sepia(100%) hue-rotate(60deg) saturate(400%) contrast(100%)",u.style.filter="sepia(100%) hue-rotate(180deg) saturate(400%) contrast(100%)"}}),fetch("/webcreation/shopitems.json").then(i=>i.json()).then(i=>{const a=i["Shop Items"],e=[];for(let b in a)a[b].forEach(f=>{f.image&&e.push("/webcreation/"+f.image)});const t=document.getElementById("strobe-bg-r"),c=document.getElementById("strobe-bg-g"),u=document.getElementById("strobe-bg-b");let m=0;e.length>0&&t&&c&&u&&(t.src=e[0],c.src=e[0],u.src=e[0],setInterval(()=>{m=(m+1)%e.length,t.src=e[m],c.src=e[m],u.src=e[m]},150))}).catch(i=>{console.error("Error loading background images:",i)});const r=document.getElementById("category-filter"),l=[];$().then(i=>{for(let e in i){const t=document.createElement("option");t.value=e,t.textContent=`${e}`,t.id=e,r.appendChild(t),i[e].forEach(c=>{const u=new k(c);console.log(u),l.push(u),x(l)})}s(i,l),document.getElementById("search-bar").addEventListener("keyup",e=>{const t=e.target.value.toLowerCase();g(l,t)})});function g(i,a){const e=i.filter(t=>t.name.toLowerCase().includes(a)||t.description.toLowerCase().includes(a));x(e),console.log(e)}function s(i,a){document.getElementById("category-filter").addEventListener("change",t=>{const c=t.target.value;h(i,a,c)})}function h(i,a,e="all"){let t=[];e==="all"?t=a:t=a.filter(c=>c.category===e),x(t)}function x(i){const a=document.getElementById("product-list");a.innerHTML="",i.length===0?a.innerHTML="<p>No products available in this category.</p>":i.forEach(e=>{const t=document.createElement("div");t.classList.add("flex","flex-row","bg-base-100","shadow-sm","rounded-lg","overflow-visible","hover:shadow-md","transition-shadow","relative"),t.innerHTML=`
        <div class="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0">
          <img src="/webcreation/${e.image}" alt="${e.name}" class="w-full h-full object-cover rounded-l-lg" />
        </div>
        <div class="flex-1 p-3 sm:p-4 flex flex-col justify-between gap-2 pr-12 sm:pr-16">
          <div class="flex-1">
            <h2 class="font-bold text-base sm:text-lg mb-1">${e.name}</h2>
            <p class="text-xs sm:text-sm text-base-content/70 line-clamp-2 mb-1 sm:mb-2">${e.description}</p>
            <p class="font-bold text-base sm:text-lg">$${e.price}</p>
          </div>
          <div class="flex flex-row items-center gap-2">
            <button class="btn btn-circle btn-sm sm:btn-md minus w-7 h-7 sm:w-10 sm:h-10 min-h-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <span class="px-3 sm:px-4 text-sm sm:text-base font-semibold qty min-w-[2rem] text-center">${e.counter}</span>
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
      `;const c=t.querySelector(".minus"),u=t.querySelector(".plus"),m=t.querySelector(".qty"),b=t.querySelector(".add");u.addEventListener("click",()=>{e.increase(),m.textContent=e.counter}),c.addEventListener("click",()=>{e.decrease(),m.textContent=e.counter}),b.addEventListener("click",()=>{e.addcart(),v.includes(e)||v.push(e),m.textContent=e.counter}),a.appendChild(t)})}}function M(){let o=y();o.innerHTML="<h1>hi</h1>"}function S(){const o=y();o.innerHTML=`
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
  `}function L(o){const n=o||v;console.log(n);const d=y();if(!d)return;if(d.innerHTML="",!Array.isArray(n)||n.length===0){d.innerHTML=`
      <h2 style="padding: 10px;">Your Basket</h2>
      <p style="padding: 10px;">Your basket is empty</p>
      <a href="#/shop" class="btn btn-sm btn-primary" style="margin: 10px;">Continue Shopping</a>`;return}let p=0;n.forEach(s=>{p+=s.pricecart}),d.innerHTML=`
    <div class="max-w-4xl mx-auto px-4 py-4">
      <h2 class="text-2xl font-bold mb-4">Your Basket</h2>
    </div>
    <div id="basket-items" class="flex flex-col gap-3 px-4 pb-4 max-w-4xl mx-auto"></div>
    <div class="max-w-4xl mx-auto px-4 py-4">
      <div class="flex justify-between items-center mb-4">
        <span id="basket-total" class="text-xl font-bold">Total: $${p.toFixed(2)}</span>
        <button class="btn btn-primary checkout-btn">Checkout</button>
      </div>
    </div>`;const r=d.querySelector("#basket-items");function l(){let s=0;n.forEach(x=>{s+=x.pricecart});const h=d.querySelector("#basket-total");h&&(h.textContent=`Total: $${s.toFixed(2)}`)}n.forEach(s=>{const h=document.createElement("div");h.classList.add("flex","flex-row","bg-base-100","shadow-sm","rounded-lg","overflow-hidden","hover:shadow-md","transition-shadow"),h.innerHTML=`
      <div class="w-20 h-20 sm:w-28 sm:h-28 flex-shrink-0">
        <img src="/webcreation/${s.image}" alt="${s.name}" class="w-full h-full object-cover rounded-l-lg" />
      </div>
      <div class="flex-1 p-3 sm:p-4 flex flex-col justify-between gap-2">
        <div class="flex-1">
          <h2 class="font-bold text-base sm:text-lg mb-1">${s.name}</h2>
          <p class="text-xs sm:text-sm text-base-content/70 line-clamp-2 mb-1">${s.description}</p>
          <p class="text-xs sm:text-sm text-base-content/70">Unit: $${s.price}</p>
        </div>
        <div class="flex flex-row items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <button class="btn btn-circle btn-sm sm:btn-md minus w-7 h-7 sm:w-10 sm:h-10 min-h-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </button>
            <span class="px-3 sm:px-4 text-sm sm:text-base font-semibold qty min-w-[2rem] text-center">${s.countercart}</span>
            <button class="btn btn-circle btn-sm sm:btn-md plus w-7 h-7 sm:w-10 sm:h-10 min-h-0">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          <div class="flex items-center gap-2">
            <span class="font-bold text-base sm:text-lg subtotal">$${s.pricecart.toFixed(2)}</span>
            <button class="btn btn-xs sm:btn-sm btn-error remove whitespace-nowrap">Remove</button>
          </div>
        </div>
      </div>
    `;const x=h.querySelector(".minus"),i=h.querySelector(".plus"),a=h.querySelector(".qty"),e=h.querySelector(".subtotal"),t=h.querySelector(".remove");i.addEventListener("click",()=>{s.countercart++,s.pricecart=s.countercart*parseFloat(s.price),a.textContent=s.countercart,e.textContent=`$${s.pricecart.toFixed(2)}`,l()}),x.addEventListener("click",()=>{s.countercart>1&&(s.countercart--,s.pricecart=s.countercart*parseFloat(s.price),a.textContent=s.countercart,e.textContent=`$${s.pricecart.toFixed(2)}`,l())}),t.addEventListener("click",()=>{const c=v.indexOf(s);c>-1&&v.splice(c,1),s.countercart=0,s.pricecart=0,L()}),r.appendChild(h)}),d.querySelector(".checkout-btn").addEventListener("click",()=>{I(),d.innerHTML=`
      <div class="p-8 text-center">
        <h2 class="text-2xl font-bold mb-4">Thank you for your order!</h2>
        <p class="mb-4">Your order has been placed successfully.</p>
        <a href="#/shop" class="btn btn-primary">Continue Shopping</a>
      </div>`})}const j={"/":w,"/home":w,"/about":S,"/gallery":M,"/shop":C,"/basket":L};function B(){const o=location.hash.replace("#","")||"/",n=j[o]||w;console.log("Current Path:",o),n()}function q(){window.addEventListener("hashchange",B),window.addEventListener("load",B)}q();B();const T=document.getElementById("subscribe-btn"),E=document.getElementById("subscribe-email"),H=document.getElementById("subscribe-modal"),O=document.getElementById("subscribe-modal-text");T.addEventListener("click",()=>{const o=E.value;o&&(O.textContent=`Thank you for subscribing, ${o}!`,H.showModal(),E.value="")});

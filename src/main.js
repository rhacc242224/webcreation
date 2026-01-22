import './index.css'
import createPageContainer from './createpagecontainer.js';
import { cart, ShopItem } from './cartsystem.js';
import testJson from './jsontest.js'
import { routes, router, addListener } from './router.js';
import Home from './pages/homepage.js';



addListener();
router();

// Subscribe button handler
const subscribeBtn = document.getElementById('subscribe-btn');
const subscribeEmail = document.getElementById('subscribe-email');
const subscribeModal = document.getElementById('subscribe-modal');
const subscribeModalText = document.getElementById('subscribe-modal-text');

subscribeBtn.addEventListener('click', () => {
  const email = subscribeEmail.value;
  if (email) {
    subscribeModalText.textContent = `Thank you for subscribing, ${email}!`;
    subscribeModal.showModal();
    subscribeEmail.value = '';
  }
});
  







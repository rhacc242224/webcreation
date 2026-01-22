import Home from './pages/homepage.js';
import Shop from './pages/shop/shopmain.js';
import Gallery from './pages/gallery.js';
import About from './pages/about.js';
import Basket from './pages/basket.js';
import './index.css'


    export const routes = {

    "/": Home,

    "/home": Home,

    "/about": About,

    "/gallery": Gallery,

    "/shop": Shop,

    "/basket": Basket,

  };



  export function router() {

    const path = location.hash.replace("#", "") || "/";

    const viewFunc = routes[path] || Home;

    console.log("Current Path:", path);

    viewFunc();

  }

  
export function addListener() {
    window.addEventListener("hashchange", router);
    window.addEventListener("load", router);

}

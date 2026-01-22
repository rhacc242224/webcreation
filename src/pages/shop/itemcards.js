import { cart, ShopItem } from '../../cartsystem.js'

export function jsonInit() {
    return fetch(import.meta.env.BASE_URL + "shopitems.json")
  .then(res => res.json())
  .then(data => {
    const shopItems = data["Shop Items"];
    console.log(shopItems);
    for (let category in shopItems) {
      


      const items = shopItems[category].map(obj => new ShopItem(obj));

      items.forEach(item => {
        console.log(" " + item.info());
      });
    return shopItems;
}});
}


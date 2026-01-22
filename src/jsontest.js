export default function testJson() {
    fetch("./data/shopitems.json")
  .then(res => res.json())
  .then(data => {
    const shopItems = data["Shop Items"];

    for (let category in shopItems) {
      console.log("Category:", category);
      const items = shopItems[category].map(obj => new ShopItem(obj));

      items.forEach(item => {
        console.log(" " + item.info());
      });
    }
  })
  .catch(err => console.error("Fetch error:", err));
}

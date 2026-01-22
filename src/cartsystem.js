import './index.css'
export const cart = [];
export class ShopItem{
  constructor(data) {
    Object.assign(this, data);
    this.countercart = 0
    this.counter = 0
    this.pricecart = 0
  }
  info() {
    return `${this.name} - ${this.price} | ${this.description}`;
  }
  increase() {
    this.counter++;
    console.log(this.counter);
    return `${this.counter}`;
  }
  decrease() { if (this.counter > 0)
    this.counter--;
    console.log(this.counter);
    return `${this.counter}`;
  }
  addcart() {
    if (this.counter > 0) {
      this.pricecart += this.counter * parseInt(this.price);
      this.countercart += this.counter;
      this.counter = 0;
      console.log(this.pricecart);
      console.log(cart);
      return `${this.counter}`;
    }
  }
    removeCart() {
      if (this.countercart > 0) {
        this.countercart--;
        this.pricecart -= this.price;

        

        let counterupdate = document.getElementById("cartcount");
        if (counterupdate) counterupdate = this.countercart;

      }
    }
}


export function addToCart(item) {
  const existing = cart.find(i => i.id === item.id);
  if (!existing) {
    cart.push(item);
  }
}

export function clearCart() {
  cart.length = 0;
}
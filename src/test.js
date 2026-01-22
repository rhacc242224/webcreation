let listingCounter = 0;
cart = [];



class Listing {

    constructor(name, price, description) {
        listingCounter++;
        this.id = listingCounter;
        this.name = name;
        this.price = price;
        this.description = description;
        this.counter = 0;
        this.countercart = 0;
        this.pricecart = 0;
    }
    increase() { this.counter++; }
    decrease() { if (this.counter > 0) this.counter--; }
    addCart() {
        if (this.counter > 0) {
            this.pricecart += this.counter * parseInt(this.price);
            this.countercart += this.counter;
            cart.push(this.countercart);
            this.counter = 0;
            console.log(this.pricecart);
            console.log(cart);

        }
    }
    removeCart() {
        if (this.countercart >0) {
            this.countercart--;
            this.pricecart -= this.price;

            let counterupdate = document.getElementById("cartcount");
            if (counterupdate) counterupdate = this.countercart;

        }
    }


}



const apple = new Listing("apple", "3", "this is an apple");
const orange = new Listing("orange", "5", "this is an orange");
const carrot = new Listing("carrot", "1", "this is a carrot");


function Item(thing) {
    const itemwrap = document.createElement("div");
    itemwrap.id = "itemwrap";
    itemwrap.classList.add("buttonsWrapInner")

    const itemname = document.createElement("h2");
    itemname.textContent = thing.name;

    const itemdescription = document.createElement("p");
    itemdescription.textContent = thing.description;

    const itemcounter = document.createElement("p");
    itemcounter.textContent = thing.counter;

    const but = document.createElement("button");
    const but2 = document.createElement("button");
    const price = document.createElement("h3");
    price.id = price; price.textContent = thing.price;
    itemwrap.appendChild(price);

    but.id = "but";
    but2.id = "but2";
    but.type = "button";
    but2.type = "button";
    but.textContent = "+";
    but2.textContent = "-";
    but.addEventListener("click", () => { thing.increase(); console.log(thing.name + " " + thing.counter + " " + thing.description);
        itemcounter.textContent = thing.counter; });
    but2.addEventListener("click", () => { thing.decrease();
        console.log(thing.name + " " + thing.counter + " " + thing.description);
        itemcounter.textContent = thing.counter; });


    const cartbutton = document.createElement("button");


    cartbutton.id = "cartbutton";
    cartbutton.type = "button";
    cartbutton.addEventListener("click", () => {
        thing.addCart();
        console.log(thing.name + " " + thing.counter + " " + thing.description);
        itemcounter.textContent = thing.counter;
    });
    itemname.classList.add("buttonsWrapInner");
    itemdescription.classList.add("buttonsWrapInner");

    itemwrap.appendChild(itemname);
    itemwrap.appendChild(itemdescription);

    const counterwrap = document.createElement("div");

    but2.classList.add("shopButtons");
    but.classList.add("shopbuttons");
    itemcounter.classList.add("shopButtons");
    counterwrap.appendChild(cartbutton);
    counterwrap.appendChild(but);
    counterwrap.appendChild(but2);
    counterwrap.appendChild(itemcounter);
    counterwrap.classList.add("buttonsContainer");
    itemwrap.appendChild(counterwrap);

    const finalwrap = document.createElement("div");
    finalwrap.id = "finalwrap";
    finalwrap.classList.add("finalwrap");
    finalwrap.appendChild(itemwrap);
    itemwrap.style.outline = "0px solid grey";

    const img = document.createElement("div");
    img.id = "img";
    img.style.width = "500px";
    img.style.backgroundColor = "white";
    img.style.height = "400px";
    img.style.outline = "1px solid grey";

    itemwrap.appendChild(img);

    const woo = document.createElement("div");
    woo.id = "h";
    woo.appendChild(counterwrap);
    woo.appendChild(itemname);
    woo.appendChild(itemdescription);
    itemwrap.appendChild(woo);
    woo.style.margin = "20px";

    document.getElementById("shopDiv").appendChild(finalwrap);

    return finalwrap;

}

function Home() {
    const container = createPageContainer();
    renderbannerDiv(id = "wrapper", ban = "var(--home-banner)31", heading = "Home");

}

function About() {

    const container = createPageContainer();
    renderbannerDiv(id = "wrapper", ban = "var(--about-banner)", heading = "About");

}


function Contact() {

    const container = createPageContainer();
    container.innerHTML = "<h1>Contact</h1>";
}

function Gallery() {

    const container = createPageContainer();
}


function Shop() {

    const container = createPageContainer();
    const shopDiv = document.createElement("div");
    container.innerHTML += "<h1>Shop</h1>";

    shopDiv.id = "shopDiv";

    shopDiv.style.display = "flex";
    shopDiv.style.flexWrap = "wrap";
    shopDiv.style.flexShrink = "200";
    container.appendChild(shopDiv);

    Item(apple);
    Item(orange);
    Item(carrot);
    Item(avocado);
    Item(banana);
    Item(potato);

}

function Basket() {

    const container = createPageContainer();
    container.innerHTML += "<h1>Basket</h1>";
    BasketFunc(apple);
    BasketFunc(orange);
    BasketFunc(carrot);

}

function BasketFunc(thing) {
    let wrap = document.getElementById("wrapper");
    let basketdiv = document.getElementById("basketdiv");
    if (thing.countercart > 1) {
        basketdiv = document.createElement("div");
        basketdiv.id = "basketdiv";
        basketdiv.style.display = "flex";

        const rem = document.createElement("button");
        rem.id = "rem";
        let c = document.createElement("h1");
        c.id = "cartcount";
        let cartcount = thing.countercart;
        c.textContent = thing.countercart;
        rem.addEventListener("click", () => {
            thing.removeCart();
            console.log(thing.countercart);
            c.textContent = thing.countercart41;

            if (thing.countercart <= 0) {
                basketdiv.removeChild(c);
                basketdiv.removeChild(rem);
            }});

        basketdiv.appendChild(c);
        basketdiv.appendChild(rem);
        wrap.appendChild(basketdiv);
        return basketdiv;
        if (thing.countercart <= 0) {
            wrap.removeChild(basketdiv);
        }



    }


}



function createPageContainer(id = "wrapper") {

    let container = document.getElementById(id);
    if (!container) {
        container = document.createElement("div");
        container.id = id;
        container.style.borderRadius = "5px";
        container.textContent = "hello";
        container.style.minHeight = "60vh";
        document.body.appendChild(container);

    }

    // Clear any previous content container.innerHTML = ""49;

    return container; }


    function renderbannerDiv() {

        const wrap = document.getElementById(id);

        console.log(id);

        console.log(ban);

        if (wrap) {

            const bannerDiv = document.createElement("div");

            bannerDiv.id = "bannerDiv";

            bannerDiv.style.cssText = `width: 100%; height: 400px; background-size: cover; 		background-position: center; background-attachment: fixed; background-repeat: no-		repeat; display: flex; justify-content: center; align-items: center; color: white; 	font-size: 3rem; bannerDiv.style.setProperty("background-image", ban); 			bannerDiv.style.setProperty("box-shadow", "inset 0 0 10px rgba(0,0,0,0.1)"`);

            bannerDiv.textContent = heading;
            wrap.appendChild(bannerDiv);
            return bannerDiv;

        }


    }

    const routes = {

        "/": Home,

        "/about": About,

        "/gallery": Gallery,

        "/shop": Shop,

        "/basket": Basket,

    }



    function router() {

        const path = location.hash.replace("#", "") || "/";

        const viewFunc = routes[path] || (() => "404");

        document.getElementById("app").innerHTML = viewFunc();

    }

    window.addEventListener("hashchange", router); window.addEventListener("load", router);


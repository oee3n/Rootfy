console.log("CART FILE IS CONNECTED");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addBtns = document.querySelectorAll(".card button, .plant-card button");


addBtns.forEach(btn => {
  btn.addEventListener("click", function() {

    const card = btn.parentElement;
    const img = card.querySelector("img").src;
    const name = card.querySelector("h3, h4").textContent;
    const price = card.querySelector("p").textContent;

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += 1; 
    } else {
      cart.push({
        img,
        name,
        price,
        quantity: 1
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateDropdownCart();

    const cartIcon = document.querySelector(".cart-icon");
    cartIcon.classList.add("cart-shake");
    setTimeout(() => cartIcon.classList.remove("cart-shake"), 400);

  });
});




function updateDropdownCart() {
  const cartList = document.getElementById("cartItems");
  const totalEl = document.getElementById("cartTotal");

  if (!cartList) return;

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
        <img src="${item.img}" class="cart-thumb">
        <div class="cart-info">
            <span class="cart-name">${item.name}</span>
            <span class="cart-price">${item.price}</span>
        </div>
        <div class="qty-controls">
            <button class="qty-btn decrease" data-index="${index}">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="qty-btn increase" data-index="${index}">+</button>
        </div>
        <button class="removeBtnSmall" data-index="${index}">X</button>
    `;

    cartList.appendChild(div);

    const priceValue = parseFloat(item.price.match(/\d+/));
    total += priceValue * item.quantity;
  });

  totalEl.textContent = "Total: " + total + " SAR";

  const realCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = realCount;
}




updateDropdownCart();

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("removeBtnSmall")) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateDropdownCart();
  }
});

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("increase")) {
    const index = e.target.dataset.index;
    cart[index].quantity += 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    updateDropdownCart();
  }
});

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("decrease")) {
    const index = e.target.dataset.index;

    if (cart[index].quantity > 1) {
      cart[index].quantity -= 1;
    } else {
      cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateDropdownCart();
  }
});







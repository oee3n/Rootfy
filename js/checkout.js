console.log("CHECKOUT SYSTEM CONNECTED");

document.getElementById("checkoutBtn").addEventListener("click", function () {
  document.getElementById("checkoutPanel").classList.add("active");
  updateCheckoutPanel();
});

document.getElementById("closeCheckout").addEventListener("click", function () {
  document.getElementById("checkoutPanel").classList.remove("active");
});

function updateCheckoutPanel() {
  const panelList = document.getElementById("checkoutList");
  const totalText = document.getElementById("checkoutTotalText");

  panelList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const priceValue = parseFloat(item.price.match(/\d+/));
    const itemTotal = priceValue * item.quantity;
    total += itemTotal;

    panelList.innerHTML += `
      <div class="checkout-item">
        <img src="${item.img}">
        <div>
          <p><strong>${item.name}</strong></p>
          <p>Quantity: ${item.quantity}</p>
          <p>${item.price}</p>
        </div>
        <p>${itemTotal} SAR</p>
      </div>
    `;
  });

  totalText.textContent = "Total: " + total + " SAR";
}

document.getElementById("confirmOrderBtn").addEventListener("click", async function () {
  const name = document.getElementById("customerName").value.trim();
  const phone = document.getElementById("customerPhone").value.trim();
  const address = document.getElementById("customerAddress").value.trim();
  const msg = document.getElementById("orderMessage");

  if (!name || !phone || !address) {
    msg.style.color = "crimson";
    msg.textContent = "Please fill all the fields.";
    return;
  }

  const cartData = JSON.parse(localStorage.getItem("cart")) || [];

  try {
    const response = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        address,
        cart: cartData
      })
    });

    const result = await response.json();
    msg.style.color = "#1b5e20";
    msg.textContent = "Order confirmed successfully!";

  } catch (err) {
    msg.style.color = "crimson";
    msg.textContent = "Failed to confirm order.";
  }
});

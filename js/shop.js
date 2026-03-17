async function loadPlants() {
  try {
    const response = await fetch("http://localhost:3000/api/sell");
    const plants = await response.json();

    const container = document.querySelector(".shop-container");

    plants.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
  <img src="media/plant1.jpg">
  <h3>${item.plant_name}</h3>
  <p>${item.price} SAR</p>
  <p>${item.care_level}</p>
  <button class="addCart">Add to cart</button>
`;

      container.appendChild(card);

      card.querySelector(".addCart").addEventListener("click", () => {
        const img = card.querySelector("img").src;
        const name = card.querySelector("h3").textContent;
        const price = card.querySelector("p").textContent;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

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

  } catch (err) {
    console.log("Error loading shop data:", err);
  }
}

loadPlants();

document.addEventListener("DOMContentLoaded", () => {

  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      plantName: form.elements["plantName"].value,
      price: form.elements["price"].value,
      careLevel: form.elements["careLevel"].value,
      city: form.elements["City"].value, 
      description: form.elements["description"].value
    };

    try {
      const res = await fetch("http://localhost:3000/api/sell", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert("Plant added successfully!");
      form.reset();

    } catch (err) {
      alert("Failed to add plant.");
    }
  });

});

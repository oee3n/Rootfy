document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const name = first + " " + last;

  let alertBox = document.getElementById("contactAlert");
  if (!alertBox) {
    alertBox = document.createElement("p");
    alertBox.id = "contactAlert";
    alertBox.style.marginTop = "15px";
    alertBox.style.fontWeight = "600";
    document.querySelector(".contact-main form").appendChild(alertBox);
  }

  if (!first || !last || !email || !message) {
    alertBox.style.color = "crimson";
    alertBox.textContent = "Please fill all the fields.";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message })
    });

    const result = await response.json();

    alertBox.style.color = "#1b5e20";
    alertBox.textContent = "Message sent successfully!";

    document.getElementById("contactForm").reset();

    loadMessages();

  } catch {
    alertBox.style.color = "crimson";
    alertBox.textContent = "Failed to send message.";
  }
});

async function loadMessages() {
  try {
    const response = await fetch("http://localhost:3000/api/contact");
    const data = await response.json();

    const container = document.getElementById("contactMessages");
    container.innerHTML = "<h3>Previous Messages:</h3>";

    data.forEach(msg => {
      container.innerHTML += `
        <div class="msg-box">
          <p><strong>Name:</strong> ${msg.name}</p>
          <p><strong>Email:</strong> ${msg.email}</p>
          <p><strong>Message:</strong> ${msg.message}</p>
          <hr>
        </div>
      `;
    });

  } catch (err) {
    console.error("Could not load messages", err);
  }
}
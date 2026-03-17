document.getElementById('aboutForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = nameInput.nextElementSibling;
    const emailError = emailInput.nextElementSibling;
    const messageError = messageInput.nextElementSibling;

    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    if (nameInput.value.trim().length < 3) {
        nameError.textContent = "Name must be at least 3 characters.";
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = "Enter a valid email address.";
        isValid = false;
    }

    if (messageInput.value.trim().length < 10) {
        messageError.textContent = "Message must be at least 10 characters.";
        isValid = false;
    }

    if (!isValid) return;

    const res = await fetch("http://localhost:3000/api/about", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
        })
    });

    const data = await res.json();

    if (data.message) {
        const toastElement = document.getElementById('successToast');
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
    }
});

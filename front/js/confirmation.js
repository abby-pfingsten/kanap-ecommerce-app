const orderIdText = document.getElementById("orderId");

const url = new URL(window.location.href);
const urlId = url.searchParams.get("id");
orderIdText.textContent = urlId;

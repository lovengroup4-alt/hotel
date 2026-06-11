// ==========================
// BOB HOTEL CART SYSTEM
// ==========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================
// ADD TO CART
// ==========================
document.addEventListener("click", function (e) {

    if (e.target.classList.contains("add-to-cart")) {

        const card = e.target.closest(".food-content");

        const name = e.target.dataset.name;
        const price = parseFloat(e.target.dataset.price);

        const qtyInput = card.querySelector(".qty");
        const quantity = parseInt(qtyInput.value);

        const existing = cart.find(item => item.name === name);

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                name,
                price,
                quantity
            });
        }

        saveCart();
        renderCart();

        alert(quantity + " × " + name + " added to cart");
    }
});

// ==========================
// SAVE CART
// ==========================
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ==========================
// RENDER CART
// ==========================
function renderCart() {

    const cartBox = document.getElementById("cart-items");
    const totalBox = document.getElementById("cart-total");

    if (!cartBox || !totalBox) return;

    if (cart.length === 0) {
        cartBox.innerHTML = "<p>Your cart is empty.</p>";
        totalBox.innerHTML = "Total: $0.00";
        return;
    }

    let total = 0;
    cartBox.innerHTML = "";

    cart.forEach((item, index) => {

        const sum = item.price * item.quantity;
        total += sum;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <p>
                ${item.name} × ${item.quantity}
                = $${sum.toFixed(2)}
            </p>

            <button onclick="removeItem(${index})">Remove</button>
        `;

        cartBox.appendChild(div);
    });

    totalBox.innerHTML = "Total: $" + total.toFixed(2);
}

// ==========================
// REMOVE ITEM
// ==========================
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// ==========================
// CHECKOUT BUTTON
// ==========================
document.addEventListener("click", function (e) {

    if (e.target.id === "checkout-btn") {

        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }

        alert("Redirecting to payment system...");

        // Later: Stripe integration here
        window.location.href = "checkout.html";
    }
});

// Load cart on page start
renderCart();

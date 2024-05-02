document.addEventListener("DOMContentLoaded", function() {
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        cartItemsContainer.innerHTML = ''; // Clear previous entries

        let subtotal = 0;
        Object.keys(cartData).forEach(key => {
            const item = cartData[key];
            const cartItemDiv = document.createElement('div');
            cartItemDiv.className = 'cart-item';
            cartItemDiv.innerHTML = `
                <div>${item.detail} - $${item.price}</div>
                <div>Qty: <span class="quantity-control" onclick="changeQuantity('${key}', -1)">-</span> ${item.quantity} <span class="quantity-control" onclick="changeQuantity('${key}', 1)">+</span></div>
                <div><button class="remove-item" onclick="removeItem('${key}')">Remove</button></div>
            `;
            cartItemsContainer.appendChild(cartItemDiv);
            subtotal += item.price * item.quantity;
        });

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    }

    window.changeQuantity = function(key, change) {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        if (cartData[key]) {
            cartData[key].quantity += change;
            cartData[key].quantity = Math.max(1, cartData[key].quantity); // Ensure quantity doesn't go below 1
            localStorage.setItem('cart', JSON.stringify(cartData));
            updateCartDisplay(); // Refresh the cart display
        }
    };

    window.removeItem = function(key) {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        delete cartData[key]; // Remove the item from the cart data
        localStorage.setItem('cart', JSON.stringify(cartData));
        updateCartDisplay(); // Refresh the cart display
    };

    window.proceedToCheckout = function() {
        alert('Proceeding to checkout...');
        window.location.href = 'https://neloxis.com/checkout';
    };

    // Initial call to set up the cart display
    updateCartDisplay();
});

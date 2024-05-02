document.addEventListener("DOMContentLoaded", function() {
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        cartItemsContainer.innerHTML = ''; // Clear previous entries

        let subtotal = 0;
        Object.keys(cartData).forEach(category => {
            const items = cartData[category];
            items.forEach(item => {
                if (item && item.detail && item.price && item.quantity && !isNaN(item.quantity)) {
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.className = 'cart-item';
                    cartItemDiv.innerHTML = `
                        <div>${item.detail} - $${item.price.toFixed(2)}</div>
                        <div>Qty: <span class="quantity-control" onclick="changeQuantity('${category}', '${item.detail}', -1)">-</span> ${item.quantity} <span class="quantity-control" onclick="changeQuantity('${category}', '${item.detail}', 1)">+</span></div>
                        <div><button class="remove-item" onclick="removeItem('${category}', '${item.detail}')">Remove</button></div>
                    `;
                    cartItemsContainer.appendChild(cartItemDiv);
                    subtotal += item.price * item.quantity;
                } else {
                    console.log('Error with item data:', item);
                }
            });
        });

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    }

    function changeQuantity(category, detail, change) {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        const item = cartData[category].find(i => i.detail === detail);
        if (item && !isNaN(item.quantity)) {
            item.quantity += change;
            item.quantity = Math.max(1, item.quantity); // Ensure quantity doesn't go below 1
            localStorage.setItem('cart', JSON.stringify(cartData));
            updateCartDisplay();
        }
    }

    function removeItem(category, detail) {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        const itemIndex = cartData[category].findIndex(i => i.detail === detail);
        if (itemIndex !== -1) {
            cartData[category].splice(itemIndex, 1);
            if (cartData[category].length === 0) {
                delete cartData[category]; // Remove the category if no items left
            }
            localStorage.setItem('cart', JSON.stringify(cartData));
            updateCartDisplay();
        }
    }

    updateCartDisplay();
});

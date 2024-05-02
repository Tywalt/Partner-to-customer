document.addEventListener("DOMContentLoaded", function() {
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        console.log("Cart Data Loaded:", cartData); // Debug: Log the loaded cart data
        cartItemsContainer.innerHTML = ''; // Clear previous entries

        let subtotal = 0;
        Object.keys(cartData).forEach(category => {
            const items = cartData[category];
            items.forEach(item => {
                console.log("Processing item:", item); // Debug: Log each item processed
                if (item && item.detail && item.price && !isNaN(item.price) && item.quantity && !isNaN(item.quantity)) {
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.className = 'cart-item';
                    cartItemDiv.innerHTML = `
                        <div>${item.detail} - $${parseFloat(item.price).toFixed(2)}</div>
                        <div>Qty: <span class="quantity-control" onclick="changeQuantity('${category}', '${item.detail}', -1)">-</span> ${item.quantity} <span class="quantity-control" onclick="changeQuantity('${category}', '${item.detail}', 1)">+</span></div>
                        <div><button class="remove-item" onclick="removeItem('${category}', '${item.detail}')">Remove</button></div>
                    `;
                    cartItemsContainer.appendChild(cartItemDiv);
                    subtotal += item.price * item.quantity;
                } else {
                    console.error('Invalid item data:', item); // Debug: Log errors for invalid data
                }
            });
        });

        const subtotalDisplay = document.getElementById('subtotal');
        subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
    }

    function changeQuantity(category, detail, change) {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        const categoryItems = cartData[category];
        const itemIndex = categoryItems.findIndex(item => item.detail === detail);
        if (itemIndex !== -1) {
            categoryItems[itemIndex].quantity += change;
            categoryItems[itemIndex].quantity = Math.max(1, categoryItems[itemIndex].quantity); // Ensure quantity doesn't drop below 1
            localStorage.setItem('cart', JSON.stringify(cartData));
            updateCartDisplay();
        }
    }

    function removeItem(category, detail) {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        const categoryItems = cartData[category];
        const itemIndex = categoryItems.findIndex(item => item.detail === detail);
        if (itemIndex !== -1) {
            categoryItems.splice(itemIndex, 1);
            if (categoryItems.length === 0) {
                delete cartData[category]; // Remove the category if no items are left
            }
            localStorage.setItem('cart', JSON.stringify(cartData));
            updateCartDisplay();
        }
    }

    updateCartDisplay();
});

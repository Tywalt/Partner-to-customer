document.addEventListener("DOMContentLoaded", function() {
    function updateCartDisplay() {
        const cartItemsContainer = document.getElementById('cart-items');
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        let subtotal = 0;

        // Ensure cartData.details exists and iterate over each item
        if (cartData.details && cartData.details.length > 0) {
            cartData.details.forEach(item => {
                if (item && item.selection && item.price) {
                    const cartItemDiv = document.createElement('div');
                    cartItemDiv.className = 'cart-item';
                    cartItemDiv.innerHTML = `
                        <div>${item.category}: ${item.selection} - $${parseFloat(item.price).toFixed(2)}</div>
                        <div>Qty: <span class="quantity-control" onclick="changeQuantity('${item.category}', '${item.selection}', -1)">-</span> 1 <span class="quantity-control" onclick="changeQuantity('${item.category}', '${item.selection}', 1)">+</span></div>
                        <div><button class="remove-item" onclick="removeItem('${item.category}', '${item.selection}')">Remove</button></div>
                    `;
                    cartItemsContainer.appendChild(cartItemDiv);
                    subtotal += item.price;
                }
            });
        } else {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        }

        const subtotalDisplay = document.getElementById('subtotal');
        subtotalDisplay.textContent = `$${subtotal.toFixed(2)}`;
    }

    function changeQuantity(category, detail, change) {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        const categoryItems = cartData.details;
        const itemIndex = categoryItems.findIndex(item => item.selection === detail && item.category === category);
        
        if (itemIndex !== -1) {
            categoryItems[itemIndex].quantity = (categoryItems[itemIndex].quantity || 1) + change;
            categoryItems[itemIndex].quantity = Math.max(1, categoryItems[itemIndex].quantity); // Ensure quantity doesn't drop below 1
            localStorage.setItem('cart', JSON.stringify(cartData));
            updateCartDisplay();
        }
    }

    function removeItem(category, detail) {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        const categoryItems = cartData.details;
        const itemIndex = categoryItems.findIndex(item => item.selection === detail && item.category === category);
        
        if (itemIndex !== -1) {
            categoryItems.splice(itemIndex, 1);
            if (categoryItems.length === 0) {
                delete cartData.details; // Remove the details if no items are left
            }
            localStorage.setItem('cart', JSON.stringify(cartData));
            updateCartDisplay();
        }
    }

    updateCartDisplay();
});

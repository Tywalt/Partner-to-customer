document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');

    function updateCartDisplay() {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        let subtotal = 0;

        cartItemsContainer.innerHTML = '';

        // Check if cart is empty
        if (Object.keys(cartData).length === 0) {
            // Display "Your cart is empty." message
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            // Update subtotal to 0
            subtotalElement.textContent = '$0.00';
            return; // Exit the function early
        }

        Object.keys(cartData).forEach(category => {
            if (!['specifications', 'processor', 'color', 'warranty', 'accessories'].includes(category)) {
                const categoryHeader = document.createElement('h3');
                categoryHeader.textContent = category;
                cartItemsContainer.appendChild(categoryHeader);

                const items = cartData[category];
                if (typeof items === 'object' && !Array.isArray(items)) {
                    Object.keys(items).forEach(key => {
                        subtotal += addItem(`${key}: ${items[key]}`);
                    });
                } else if (Array.isArray(items)) {
                    items.forEach(item => {
                        subtotal += addItem(item);
                    });
                }
            }
        });

        // Update the subtotal display
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    function addItem(item) {
        const priceRegex = /\$\d+(\.\d{2})?/;
        const match = item.match(priceRegex);
        let price = match ? parseFloat(match[0].substring(1)) : 0;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.textContent = item;
        cartItemsContainer.appendChild(itemElement);

        return price;
    }

    // Initial call to update cart display
    updateCartDisplay();
});

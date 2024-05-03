document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');

    function updateCartDisplay() {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        let subtotal = 0;

        // Clear existing cart items
        cartItemsContainer.innerHTML = '';

        if (Object.keys(cartData).length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            Object.keys(cartData).forEach(category => {
                const categoryHeader = document.createElement('h3');
                categoryHeader.textContent = category; // Setting category name as header
                cartItemsContainer.appendChild(categoryHeader);

                const items = cartData[category];
                if (typeof items === 'object' && !Array.isArray(items)) {
                    // Handle structured object for main product details
                    Object.keys(items).forEach(detail => {
                        subtotal += addCartItem(`${detail}: ${items[detail]}`);
                    });
                } else if (Array.isArray(items)) {
                    // Handle arrays for add-ons and accessories
                    items.forEach(item => {
                        subtotal += addCartItem(item);
                    });
                }
            });
        }

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    function addCartItem(item) {
        const priceMatch = item.match(/\$\d+(\.\d{2})?/); // Regex to extract price
        let price = priceMatch ? parseFloat(priceMatch[0].replace('$', '')) : 0;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.textContent = item;
        cartItemsContainer.appendChild(itemElement);

        return price;
    }

    updateCartDisplay();
});

document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');

    function updateCartDisplay() {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        console.log("Cart Data:", cartData); // Debug: Log the loaded cart data
        let subtotal = 0;

        cartItemsContainer.innerHTML = '';

        if (Object.keys(cartData).length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            Object.keys(cartData).forEach(category => {
                const categoryHeader = document.createElement('h3');
                categoryHeader.textContent = category;
                cartItemsContainer.appendChild(categoryHeader);

                const items = cartData[category];
                if (typeof items === 'object' && !Array.isArray(items)) {
                    Object.keys(items).forEach(detail => {
                        subtotal += addCartItem(`${detail}: ${items[detail]}`);
                    });
                } else if (Array.isArray(items)) {
                    items.forEach(item => {
                        subtotal += addCartItem(item);
                    });
                }
            });
        }

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    function addCartItem(item) {
        console.log("Adding item:", item); // Debug: Log each item processed
        const priceRegex = /\$\d+(\.\d{2})?/; // Regex to extract price
        const match = item.match(priceRegex);
        let price = match ? parseFloat(match[0].substring(1)) : 0;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.textContent = item;
        cartItemsContainer.appendChild(itemElement);

        return price;
    }

    updateCartDisplay();
});

document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');

    function updateCartDisplay() {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        let subtotal = 0;
        cartItemsContainer.innerHTML = '';

        if (Object.keys(cartData).length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            Object.keys(cartData).forEach(category => {
                const categoryHeader = document.createElement('h3');
                categoryHeader.textContent = category;  // Sets category like 'Surface Pro 10 for Business'
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
            });
        }

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    function addItem(item) {
        const priceMatch = item.match(/\$\d+(\.\d{2})?/);
        let price = priceMatch ? parseFloat(priceMatch[0].substring(1)) : 0;

        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.textContent = item;
        cartItemsContainer.appendChild(itemElement);

        return price;
    }

    updateCartDisplay();
});

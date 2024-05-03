document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');

    function updateCartDisplay() {
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        console.log("Retrieved cart data:", cartData);
    
        let subtotal = 0;
        cartItemsContainer.innerHTML = '';
    
        if (Object.keys(cartData).length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            subtotalElement.textContent = '$0.00';
            return;
        }
    
        Object.keys(cartData).forEach(category => {
            const categoryHeader = document.createElement('h3');
            categoryHeader.textContent = category;
            cartItemsContainer.appendChild(categoryHeader);
    
            const items = cartData[category];
            if (typeof items === 'object' && !Array.isArray(items)) {
                Object.keys(items).forEach(key => {
                    const itemValue = items[key];
                    if (itemValue) {
                        subtotal += addItem(`${key}: ${itemValue}`);
                    } else {
                        addItem(`${key}: Not specified`); // Handling undefined or null values
                    }
                });
            } else if (Array.isArray(items)) {
                items.forEach(item => {
                    subtotal += addItem(item);
                });
            }
        });
    
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

    updateCartDisplay();
});

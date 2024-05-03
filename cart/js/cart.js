document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');

    function updateCartDisplay() {
        // Retrieve the cart data from localStorage and parse it
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        let subtotal = 0;

        // Clear existing cart items
        cartItemsContainer.innerHTML = '';

        // Check if the cart data is empty
        if (Object.keys(cartData).length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            // Iterate through each category in the cart data
            Object.keys(cartData).forEach(category => {
                // Exclude unwanted categories
                if (!['specifications', 'processor', 'color', 'warranty', 'accessories'].includes(category)) {
                    // Create a header for each category
                    const categoryHeader = document.createElement('h3');
                    categoryHeader.textContent = category; // Setting category name as header
                    cartItemsContainer.appendChild(categoryHeader);

                    const items = cartData[category];
                    if (typeof items === 'object' && !Array.isArray(items)) {
                        // If the category is an object, process each key as a detail item
                        Object.keys(items).forEach(key => {
                            subtotal += addItem(`${key}: ${items[key]}`);
                        });
                    } else if (Array.isArray(items)) {
                        // If the category is an array, process each item normally
                        items.forEach(item => {
                            subtotal += addItem(item);
                        });
                    }
                }
            });
        }

        // Update the subtotal display
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    function addItem(item) {
        // Extract price using a regular expression
        const priceRegex = /\$\d+(\.\d{2})?/;
        const match = item.match(priceRegex);
        let price = match ? parseFloat(match[0].substring(1)) : 0;
        
        // Create a div element for each cart item
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.textContent = item;
        cartItemsContainer.appendChild(itemElement);

        return price; // Return the price for subtotal calculation
    }

    // Initial call to update cart display on page load
    updateCartDisplay();
});

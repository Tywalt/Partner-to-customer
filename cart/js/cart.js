document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');

    // Function to update the cart display based on stored data
    function updateCartDisplay() {
        // Retrieve the cart data from localStorage
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        let subtotal = 0;

        // Clear existing cart items
        cartItemsContainer.innerHTML = '';

        // Check if there is any data to display
        if (Object.keys(cartData).length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            // Iterate through each category in the cart data
            Object.keys(cartData).forEach(key => {
                const items = cartData[key];
                if (Array.isArray(items)) {
                    items.forEach(item => {
                        subtotal += addCartItem(key, item);
                    });
                } else if (items) {
                    subtotal += addCartItem(key, items);
                }
            });
        }

        // Update the subtotal display
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Function to add individual cart items to the HTML
    function addCartItem(category, item) {
        const priceRegex = /\$\d+\.?\d*/; // Regex to extract price
        const match = item.match(priceRegex); // Find price in the item string
        let price = match ? parseFloat(match[0].substring(1)) : 0;

        // Create a new div element for the cart item
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.textContent = `${category}: ${item}`;

        // Append the new div to the cart items container
        cartItemsContainer.appendChild(itemElement);

        return price; // Return the price for subtotal calculation
    }

    // Initial call to update cart display on page load
    updateCartDisplay();
});

document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');

    function updateCartDisplay() {
        // Retrieve cart data from localStorage and parse it
        const cartData = JSON.parse(localStorage.getItem('cart') || '{}');
        console.log("Cart Data:", cartData); // Debug: Output the cart data to the console

        let subtotal = 0;

        // Clear existing cart items
        cartItemsContainer.innerHTML = '';

        // Check if the cart data is empty
        if (Object.keys(cartData).length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            // Loop through each category in the cart data
            Object.keys(cartData).forEach(category => {
                // Create a header for each category
                const categoryHeader = document.createElement('h3');
                categoryHeader.textContent = category;
                cartItemsContainer.appendChild(categoryHeader);

                const items = cartData[category];
                if (typeof items === 'object' && !Array.isArray(items)) {
                    // If the category is an object, process each key as a detail item
                    Object.keys(items).forEach(detail => {
                        subtotal += addCartItem(`${detail}: ${items[detail]}`);
                    });
                } else if (Array.isArray(items)) {
                    // If the category is an array, process each item normally
                    items.forEach(item => {
                        subtotal += addCartItem(item);
                    });
                }
            });
        }

        // Update the subtotal display
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    function addCartItem(item) {
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

    // Initial call to update the cart display when the page loads
    updateCartDisplay();
});

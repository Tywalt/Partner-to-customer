document.addEventListener("DOMContentLoaded", function() {
    const cartDisplay = document.getElementById('cart-items');

    // Debug: Output the raw local storage data for cart to console for inspection
    console.log('Raw cart data from localStorage:', localStorage.getItem('cart'));

    // Safely parse the local storage data with error handling
    let cartData;
    try {
        cartData = JSON.parse(localStorage.getItem('cart'));
    } catch (error) {
        console.error('Error parsing cart data:', error);
        cartDisplay.innerHTML = '<div class="empty-cart">Failed to load cart data.</div>';
        return; // Exit the function if parsing fails
    }

    // Debug: Output the parsed cart data to console
    console.log('Parsed cart data:', cartData);

    // Check if cartData is not null and has keys
    if (cartData && Object.keys(cartData).length > 0) {
        // Clear the existing content
        cartDisplay.innerHTML = '';

        // Loop through each key in the cartData object
        Object.keys(cartData).forEach(key => {
            const value = cartData[key];
            // Check if the value is an array (multiple items)
            if (Array.isArray(value)) {
                value.forEach(item => {
                    const detail = document.createElement('p');
                    detail.textContent = `${key.toUpperCase()}: ${item}`;
                    cartDisplay.appendChild(detail);
                });
            } else {
                // Single item
                const detail = document.createElement('p');
                detail.textContent = `${key.toUpperCase()}: ${value}`;
                cartDisplay.appendChild(detail);
            }
        });
    } else {
        // Display an empty cart message if no data or empty
        cartDisplay.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
    }

    // Event listener for the checkout button
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            alert('Proceeding to checkout...');
            // Assuming the checkout page URL is correct and reachable
            window.location.href = 'https://neloxis.com/checkout';
        });
    } else {
        // Debug: Log if the checkout button is not found
        console.error('Checkout button not found');
    }
});

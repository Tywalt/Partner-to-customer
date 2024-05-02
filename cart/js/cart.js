document.addEventListener("DOMContentLoaded", function() {
    const cartDisplay = document.getElementById('cart-items');

    // Attempt to load selections from Local Storage
    let cartData;
    try {
        cartData = JSON.parse(localStorage.getItem('cart'));
        console.log('Loaded cart data:', cartData);  // Debug to console
    } catch (error) {
        console.error('Failed to parse cart data:', error);
        cartDisplay.innerHTML = '<div class="empty-cart">There was an error loading your cart.</div>';
        return; // Exit if there's an error
    }

    // Check if cartData is not null and has items
    if (cartData && Object.keys(cartData).length > 0) {
        cartDisplay.innerHTML = ''; // Clear existing content
        Object.keys(cartData).forEach(key => {
            const item = cartData[key];
            // Create a paragraph element for each item
            const detail = document.createElement('p');
            if (Array.isArray(item)) {
                // Handle array of items like accessories
                item.forEach(subItem => {
                    detail.textContent = `${key.toUpperCase()}: ${subItem.detail} (Quantity: ${subItem.quantity})`;
                    cartDisplay.appendChild(detail.cloneNode(true));  // Append a copy of the node
                });
            } else {
                // Handle single items like processor, color, etc.
                detail.textContent = `${key.toUpperCase()}: ${item.detail} (Quantity: ${item.quantity})`;
                cartDisplay.appendChild(detail);
            }
        });
    } else {
        // Display an empty cart message if no data
        cartDisplay.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
    }

    // Handle the checkout button functionality
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            alert('Proceeding to checkout...');
            window.location.href = 'https://neloxis.com/checkout';
        });
    } else {
        console.error('Checkout button not found');
    }
});

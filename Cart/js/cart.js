document.addEventListener("DOMContentLoaded", function() {
    const cartDisplay = document.getElementById('cart-items');

    // Load selections from Local Storage
    const cartData = JSON.parse(localStorage.getItem('cart'));

    if (cartData && Object.keys(cartData).length > 0) {
        // Clear the existing content
        cartDisplay.innerHTML = '';

        Object.keys(cartData).forEach(key => {
            const value = cartData[key];
            if (Array.isArray(value)) {
                value.forEach(item => {
                    const detail = document.createElement('p');
                    detail.textContent = `${key.toUpperCase()}: ${item}`;
                    cartDisplay.appendChild(detail);
                });
            } else if (value) {
                const detail = document.createElement('p');
                detail.textContent = `${key.toUpperCase()}: ${value}`;
                cartDisplay.appendChild(detail);
            }
        });
    } else {
        // Display an empty cart message
        cartDisplay.innerHTML = '<div class="empty-cart">Your cart is empty.</div>';
    }

    // Event listener for the checkout button
    document.getElementById('checkout-button').addEventListener('click', function() {
        // Here, you could implement redirecting to a checkout page or handling checkout logic
        alert('Proceeding to checkout...');
        // Example redirect: window.location.href = 'https://neloxis.com/checkout';
    });
});

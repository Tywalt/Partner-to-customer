document.addEventListener("DOMContentLoaded", function() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');

    // Retrieve and display cart data on page load
    let selections = JSON.parse(localStorage.getItem('cart') || '{}');
    updateCartDisplay();

    // Function to update the display of items in the cart
    function updateCartDisplay() {
        cartItemsContainer.innerHTML = ''; // Clear existing items
        let subtotal = 0;

        Object.keys(selections).forEach(category => {
            const categoryHeader = document.createElement('h3');
            categoryHeader.textContent = category;
            cartItemsContainer.appendChild(categoryHeader);

            selections[category].forEach(item => {
                const itemDetail = document.createElement('div');
                itemDetail.className = 'cart-item';

                // Item description
                const description = document.createTextNode(`${item.name}: ${item.details.name} - $${item.details.price.toFixed(2)} x `);

                // Quantity input
                const quantityInput = document.createElement('input');
                quantityInput.type = 'number';
                quantityInput.min = '1';
                quantityInput.value = item.quantity;
                quantityInput.addEventListener('change', () => {
                    changeQuantity(category, item.name, parseInt(quantityInput.value, 10));
                });

                // Remove button
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.addEventListener('click', () => {
                    removeFromCart(category, item.name);
                });

                // Append elements to item detail container
                itemDetail.appendChild(description);
                itemDetail.appendChild(quantityInput);
                itemDetail.appendChild(removeButton);
                cartItemsContainer.appendChild(itemDetail);

                subtotal += item.details.price * item.quantity;
            });
        });

        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    // Function to change quantity in the cart
    function changeQuantity(category, itemName, newQuantity) {
        const itemIndex = selections[category].findIndex(item => item.name === itemName);
        if (itemIndex !== -1) {
            selections[category][itemIndex].quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(selections));
            updateCartDisplay(); // Redraw the cart
        }
    }

    // Function to remove an item from the cart
    function removeFromCart(category, itemName) {
        selections[category] = selections[category].filter(item => item.name !== itemName);
        localStorage.setItem('cart', JSON.stringify(selections));
        updateCartDisplay(); // Redraw the cart
    }
});

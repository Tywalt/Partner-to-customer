class Cart {
    constructor() {
        this.cartItemsContainer = document.getElementById('cart-items');
        this.subtotalElement = document.getElementById('subtotal');
        this.selections = JSON.parse(localStorage.getItem('cart') || '{}');
        this.initCart();
    }

    initCart() {
        document.addEventListener("DOMContentLoaded", () => this.updateCartDisplay());
    }

    async updateCartDisplay() {
        this.cartItemsContainer.innerHTML = ''; // Clear existing items
        let subtotal = 0;

        Object.entries(this.selections).forEach(([category, items]) => {
            const categoryHeader = document.createElement('h3');
            categoryHeader.textContent = category;
            this.cartItemsContainer.appendChild(categoryHeader);

            items.forEach(item => {
                const itemDetail = document.createElement('div');
                itemDetail.className = 'cart-item';
                itemDetail.innerHTML = `
                    ${item.name}: ${item.details.name} - $${item.details.price.toFixed(2)} x 
                    <input type="number" min="1" value="${item.quantity}" onchange="cart.changeQuantity('${category}', '${item.name}', this.value)" />
                    <button onclick="cart.removeFromCart('${category}', '${item.name}')">Remove</button>
                `;

                this.cartItemsContainer.appendChild(itemDetail);
                subtotal += item.details.price * item.quantity;
            });
        });

        this.subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }

    changeQuantity(category, itemName, newQuantity) {
        const itemIndex = this.selections[category].findIndex(item => item.name === itemName);
        if (itemIndex !== -1) {
            this.selections[category][itemIndex].quantity = parseInt(newQuantity, 10);
            localStorage.setItem('cart', JSON.stringify(this.selections));
            this.updateCartDisplay(); // Redraw the cart
        }
    }

    removeFromCart(category, itemName) {
        this.selections[category] = this.selections[category].filter(item => item.name !== itemName);
        localStorage.setItem('cart', JSON.stringify(this.selections));
        this.updateCartDisplay(); // Redraw the cart
    }
}

// Instantiate the Cart object
const cart = new Cart();

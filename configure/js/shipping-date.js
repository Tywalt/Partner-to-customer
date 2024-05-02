document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded and parsed");
    
    const date = new Date(); // Gets today's date
    date.setDate(date.getDate() + 3); // Adds 3 days

    const options = { month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('en-US', options); // Format date

    // Update the shipping info text
    const shippingInfoElement = document.getElementById('shipping-info');
    if (shippingInfoElement) {
        shippingInfoElement.textContent = `Get it as soon as ${dateString}. Free Returns`;
        console.log("Shipping info updated: " + shippingInfoElement.textContent);
    } else {
        console.log("Shipping info element not found");
    }
});

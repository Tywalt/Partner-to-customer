document.addEventListener('DOMContentLoaded', function() {
    // Update function for screen size
    document.querySelectorAll('input[name="screen-size"]').forEach(input => {
        input.addEventListener('change', function() {
            document.getElementById('summary-screen-size').textContent = this.value + ' inch';
        });
    });

    // Update function for color and change image
    document.querySelectorAll('input[name="color"]').forEach(input => {
        input.addEventListener('change', function() {
            document.getElementById('summary-color').textContent = this.value;
            // Check if the color is Black, then change the image
            if (this.value === 'Black') {
                document.getElementById('product-image').src = 'black-device-image.png'; // Path to your black device image
            } else {
                document.getElementById('product-image').src = 'default-image.png'; // Path to your default/platinum device image
            }
        });
    });
});

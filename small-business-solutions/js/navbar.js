// Wait for the DOM to be loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get all elements that could open dropdowns
    var navLinks = document.querySelectorAll('.nav-item');

    // Add click event listeners to each nav item that could have a dropdown
    navLinks.forEach(function(navItem) {
        navItem.addEventListener('click', function(event) {
            // Check if there is a dropdown within this nav item
            var dropdownContent = this.querySelector('.dropdown-content');
            if (dropdownContent) {
                // Prevent default link behavior
                event.preventDefault();

                // Toggle the display style
                dropdownContent.style.display = dropdownContent.style.display === 'flex' ? 'none' : 'flex';

                // Stop the click event from propagating to the document
                event.stopPropagation();
            }
        });
    });

    // Close the dropdown when clicking anywhere else on the page
    document.addEventListener('click', function(event) {
        // Get all dropdowns
        var dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(function(dropdown) {
            // If the clicked element is not part of the dropdown menu, close the dropdown
            if (dropdown.style.display === 'flex') {
                dropdown.style.display = 'none';
            }
        });
    });
});

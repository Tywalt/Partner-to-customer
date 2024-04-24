document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('.nav-item');

    // Attach click events to nav items to toggle dropdowns
    navLinks.forEach(function(navItem) {
        navItem.addEventListener('click', function(event) {
            // Prevents redirecting if there's a dropdown
            var dropdownContent = this.querySelector('.dropdown-content');
            if (dropdownContent) {
                event.preventDefault();
                // Toggle current dropdown visibility
                dropdownContent.style.display = dropdownContent.style.display === 'flex' ? 'none' : 'flex';
                event.stopPropagation(); // Prevents the click from closing this dropdown
            }
        });
    });

    // Listener to close all dropdowns if the click is outside
    document.addEventListener('click', function(event) {
        var dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(function(dropdown) {
            if (dropdown.style.display === 'flex') {
                dropdown.style.display = 'none';
            }
        });
    });

    // Allow dropdown links to function normally
    document.querySelectorAll('.dropdown-content a').forEach(function(link) {
        link.addEventListener('click', function(event) {
            // This allows the link to act as normal without stopping the page navigation
            event.stopPropagation(); // Stops the dropdown click from propagating to the document
        });
    });
});
// Wait for the DOM to be loaded before running the script
document.addEventListener('DOMContentLoaded', function() {
    // Get the element that opens the dropdown
    var devicesDropdown = document.querySelector('.nav-item .nav-link');

    // Listen for a click event on the dropdown opener
    devicesDropdown.addEventListener('click', function(event) {
        // Prevent default link behavior
        event.preventDefault();
        
        // Get the dropdown content element
        var dropdownContent = this.nextElementSibling;
        
        // Toggle the display style
        dropdownContent.style.display = dropdownContent.style.display === 'flex' ? 'none' : 'flex';
        
        // Stop the click event from propagating to the document
        event.stopPropagation();
    });

    // Close the dropdown when clicking anywhere else on the page
    window.addEventListener('click', function(event) {
        // If the clicked element is not part of the dropdown menu, close the dropdown
        var dropdownContent = document.querySelector('.dropdown-content');
        if (dropdownContent.style.display === 'flex') {
            dropdownContent.style.display = 'none';
        }
    });
});

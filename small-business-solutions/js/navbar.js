document.addEventListener('DOMContentLoaded', function() {
    var navLinks = document.querySelectorAll('.nav-item');

    navLinks.forEach(function(navItem) {
        navItem.addEventListener('click', function(event) {
            var dropdownContent = this.querySelector('.dropdown-content');
            if (dropdownContent) {
                event.preventDefault();
                // Toggle display and stop propagation
                dropdownContent.style.display = dropdownContent.style.display === 'flex' ? 'none' : 'flex';
                event.stopPropagation();
            }
        });
    });

    // Close dropdowns only if the click is outside of any dropdown content
    document.addEventListener('click', function(event) {
        var isClickInsideDropdown = event.target.closest('.dropdown-content');

        if (!isClickInsideDropdown) {
            var dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(function(dropdown) {
                if (dropdown.style.display === 'flex') {
                    dropdown.style.display = 'none';
                }
            });
        }
    });
});
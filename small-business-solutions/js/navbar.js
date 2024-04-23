// Toggle dropdown function
function toggleDropdown() {
    var dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.style.display = (dropdownMenu.style.display === 'flex') ? 'none' : 'flex';
}

// Close dropdowns when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.nav-link')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'flex') {
                openDropdown.style.display = 'none';
            }
        }
    }
}

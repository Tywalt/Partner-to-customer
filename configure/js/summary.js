document.addEventListener("DOMContentLoaded", function() {
    const options = document.querySelectorAll('input[type="radio"]');
    const summaryDetails = document.getElementById('summary-details');
    
    // Define the order in which selections should be displayed
    let selections = {
        'screen-size': '',
        'processor': '',
        'color': '',
        'specifications': ''
    };

    // Add event listeners to each radio button
    options.forEach(option => {
        option.addEventListener('change', updateSummary);
    });

    function updateSummary() {
        // Update the selections object with the latest choice
        if (this.checked) {
            selections[this.name] = this.parentNode.textContent.trim();
            displaySelections();
        }
    }

    function displaySelections() {
        summaryDetails.innerHTML = ''; // Clear previous details

        // Display the selections according to the predefined order
        for (let key in selections) {
            if (selections[key]) { // Only add to list if a selection has been made
                const li = document.createElement('li');
                li.textContent = selections[key];
                summaryDetails.appendChild(li);
            }
        }
    }
});

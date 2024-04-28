document.addEventListener("DOMContentLoaded", function() {
    const nextButtons = document.querySelectorAll('.btn-next');
    const sections = document.querySelectorAll('.options');
    const progressBar = document.querySelector('.progress-bar');
    const specificationsLink = document.getElementById('specifications-link');
    const specificationsSection = document.getElementById('specifications');
    const addonsSection = document.getElementById('addons');
    const summary = document.querySelector('.summary');
    const summaryAddon = summary.querySelector('.addon-summary');
    const summarySpecification = summary.querySelector('.specification-summary');
    const circles = progressBar.querySelectorAll('.step circle');
    let currentSectionIndex = 0;

    nextButtons.forEach(button => button.addEventListener('click', function() {
        moveToNextSection();
    }));

    // Event listener for radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(button => {
        button.addEventListener('change', function(event) {
            // Uncheck all other radio buttons in the same group
            const groupName = event.target.name;
            document.querySelectorAll(`input[type="radio"][name="${groupName}"]`).forEach(btn => {
                btn.closest('.option').classList.remove('checked');
            });

            // Check the selected radio button
            event.target.closest('.option').classList.add('checked');
        });
    });

    function moveToNextSection() {
        const currentSection = sections[currentSectionIndex];
        const nextSection = sections[currentSectionIndex + 1];

        // Check if all options are selected in the current section
        if (checkAllOptionsSelected(currentSection)) {
            currentSection.classList.add('hidden');
            nextSection.classList.remove('hidden');
            updateProgressBar(currentSectionIndex + 1);
            currentSectionIndex++;

            // Highlight options if moving to the add-ons section
            if (nextSection.id === 'addons') {
                highlightUnselectedOptions(addonsSection);
            } else {
                highlightUnselectedOptions(currentSection);
            }

            // Update summary if moving to the summary section
            if (nextSection.id === 'summary') {
                updateSummary();
            }
        } else {
            // If options are not selected, remove highlighting from the current section
            removeHighlightOptions(currentSection);
        }
    }

    function updateProgressBar(stepNumber) {
        circles.forEach((circle, index) => {
            if (index <= stepNumber) {
                circle.setAttribute('fill', '#007bff'); // Fill color (change as needed)
            } else {
                circle.setAttribute('fill', 'none'); // Empty color (change as needed)
            }
        });
    }

    function checkAllOptionsSelected(section) {
        const options = section.querySelectorAll('input[type="radio"]:checked');
        return options.length > 0;
    }

    function highlightUnselectedOptions(section) {
        const options = section.querySelectorAll('input[type="radio"]');
        options.forEach(option => {
            // Only apply the green effect if the option is checked
            if (option.checked) {
                option.closest('.option').classList.add('checked');
            } else {
                option.closest('.option').classList.remove('checked');
            }
        });
    }

    function removeHighlightOptions(section) {
        const options = section.querySelectorAll('input[type="radio"]');
        options.forEach(option => {
            option.closest('.option').classList.remove('checked');
        });
    }

    function updateSummary() {
        const selectedOptions = addonsSection.querySelectorAll('input[type="radio"][name="warranty"]:checked');
        let summaryText = "";
        selectedOptions.forEach(option => {
            summaryText += option.value + "<br>";
        });
        summaryAddon.innerHTML = summaryText;
    }

    specificationsLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default link behavior
        specificationsSection.classList.remove('hidden');
        addonsSection.classList.add('hidden');
        // Reset progress bar to show only one filled circle for Specifications
        updateProgressBar(0);
        currentSectionIndex = 0; // Reset current section index
    });

    // Add event listeners to add-ons radio buttons
    const addonRadioButtons = addonsSection.querySelectorAll('input[type="radio"][name="warranty"]');
    addonRadioButtons.forEach(button => {
        button.addEventListener('change', updateSummary);
    });

    // Initialize progress bar with one filled circle for Specifications
    updateProgressBar(0);
});

document.addEventListener("DOMContentLoaded", function() {
    const processorOptions = document.querySelectorAll('input[name="processor"]');
    const colorOptions = document.querySelectorAll('input[name="color"]');
    const specOptions = document.querySelectorAll('input[name="specifications"]');
    const addonOptions = document.querySelectorAll('input[name="warranty"]');
    const summaryDetails = document.getElementById('summary-details');
    const nextButton = document.querySelector('.btn-next');

    // Initially hide all specification options
    hideAllSpecOptions();

    // Add event listeners to processor and color options
    processorOptions.forEach(option => option.addEventListener('change', updateDisplay));
    colorOptions.forEach(option => option.addEventListener('change', updateDisplay));

    // Add event listeners for specification and addon options to update the summary
    specOptions.forEach(option => option.addEventListener('change', updateSummary));
    addonOptions.forEach(option => option.addEventListener('change', updateSummary));

    function updateDisplay() {
        filterSpecifications();
        updateSummary();
    }

    function hideAllSpecOptions() {
        specOptions.forEach(option => option.closest('.option').style.display = 'none');
    }

    function filterSpecifications() {
        const selectedProcessor = document.querySelector('input[name="processor"]:checked')?.value;
        const selectedColor = document.querySelector('input[name="color"]:checked')?.value;

        if (selectedProcessor || selectedColor) {
            specOptions.forEach(option => {
                const processorMatch = selectedProcessor ? option.dataset.processor === selectedProcessor : true;
                const colorMatch = selectedColor ? option.dataset.color === selectedColor : true;
                option.closest('.option').style.display = (processorMatch && colorMatch) ? 'block' : 'none';
            });
        } else {
            hideAllSpecOptions();
        }
    }

    function updateSummary() {
        summaryDetails.innerHTML = ''; // Clear the summary
        appendSelectionToSummary(processorOptions, 'Processor');
        appendSelectionToSummary(colorOptions, 'Color');
        appendSelectionToSummary(Array.from(specOptions).filter(option => option.closest('.option').style.display !== 'none'), 'Specifications');
        appendSelectionToSummary(addonOptions, 'Add-ons');
    }

    function appendSelectionToSummary(options) {
        options.forEach(option => {
            if (option.checked && option.closest('.option').style.display !== 'none') {
                const li = document.createElement('li');
                li.textContent = option.nextElementSibling.textContent.trim(); // No label prepended
                summaryDetails.appendChild(li);
            }
        });
    }

    nextButton.addEventListener('click', function() {
        clearErrorHighlights();
        if (!checkAllSectionsFilled()) {
            highlightUnfilledSections();
        } else {
            // Proceed to the next step
            console.log("All selections made, proceeding to next step.");
            // Implement the logic for proceeding to the next step here
        }
    });

    function checkAllSectionsFilled() {
        return [processorOptions, colorOptions, specOptions, addonOptions].every(group => {
            const visibleOptions = Array.from(group).filter(opt => opt.closest('.option').style.display !== 'none');
            return visibleOptions.length === 0 || visibleOptions.some(option => option.checked);
        });
    }

    function clearErrorHighlights() {
        document.querySelectorAll('.highlight-error').forEach(option => {
            option.classList.remove('highlight-error');
        });
    }

    function highlightUnfilledSections() {
        const allOptions = [...processorOptions, ...colorOptions, ...specOptions, ...addonOptions];
        allOptions.forEach(option => {
            if (!option.checked && option.closest('.option').style.display !== 'none') {
                option.closest('.option').classList.add('highlight-error');
            }
        });
    }
});

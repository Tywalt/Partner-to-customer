document.addEventListener("DOMContentLoaded", function() {
    const processorOptions = document.querySelectorAll('input[name="processor"]');
    const colorOptions = document.querySelectorAll('input[name="color"]');
    const specOptions = document.querySelectorAll('input[name="specifications"]');
    const addonOptions = document.querySelectorAll('input[name="warranty"]');
    const summaryDetails = document.getElementById('summary-details');
    const nextButton = document.querySelector('.btn-next');

    // Hide all specification options by default
    hideAllSpecOptions();

    processorOptions.forEach(option => option.addEventListener('change', updateDisplay));
    colorOptions.forEach(option => option.addEventListener('change', updateDisplay));
    specOptions.forEach(option => option.addEventListener('change', updateSummary));
    addonOptions.forEach(option => option.addEventListener('change', updateSummary));

    function hideAllSpecOptions() {
        specOptions.forEach(option => {
            option.closest('.option').style.display = 'none';
        });
    }

    function updateDisplay() {
        filterSpecifications();
        updateSummary();
    }

    function filterSpecifications() {
        const selectedProcessor = document.querySelector('input[name="processor"]:checked')?.value;
        const selectedColor = document.querySelector('input[name="color"]:checked')?.value;

        specOptions.forEach(option => {
            const processor = option.closest('.option').dataset.processor;
            const color = option.closest('.option').dataset.color;
            const processorMatch = selectedProcessor ? processor === selectedProcessor : false;
            const colorMatch = selectedColor ? color === selectedColor : false;
            const display = (selectedProcessor && selectedColor) ? (processorMatch && colorMatch) :
                            (selectedProcessor) ? processorMatch :
                            (selectedColor) ? colorMatch : false;
            option.closest('.option').style.display = display ? 'block' : 'none';
        });
    }

    function updateSummary() {
        summaryDetails.innerHTML = '';
        appendSelectionToSummary(processorOptions, 'Processor');
        appendSelectionToSummary(colorOptions, 'Color');
        appendSelectionToSummary(specOptions, 'Specifications');
        appendSelectionToSummary(addonOptions, 'Add-ons');
    }

    function appendSelectionToSummary(options, category) {
        options.forEach(option => {
            if (option.checked && option.closest('.option').style.display !== 'none') {
                const li = document.createElement('li');
                li.textContent = category + ': ' + option.nextElementSibling.textContent.trim();
                summaryDetails.appendChild(li);
            }
        });
    }

    // ... (rest of the code remains the same as previously provided)
});

document.addEventListener("DOMContentLoaded", function() {
    const processorOptions = document.querySelectorAll('input[name="processor"]');
    const colorOptions = document.querySelectorAll('input[name="color"]');
    const specOptions = document.querySelectorAll('input[name="specifications"]');
    const summaryDetails = document.getElementById('summary-details');

    let selectedProcessor = '';
    let selectedColor = '';
    let selectedSpec = null;

    processorOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedProcessor = this.nextElementSibling.textContent.trim();
            selectedColor = ''; // Reset color selection
            selectedSpec = null; // Reset specification selection
            updateSummary();
            filterSpecifications();
            resetColorAndSpec(); // Reset color and specification options
        });
    });

    colorOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedColor = this.nextElementSibling.textContent.trim();
            // Set default processor to the first option if no processor is selected
            if (!selectedProcessor) {
                selectedProcessor = processorOptions[0].nextElementSibling.textContent.trim();
            }
            selectedSpec = null; // Reset specification selection
            updateSummary();
            filterSpecifications();
        });
    });

    specOptions.forEach(option => {
        option.addEventListener('change', function() {
            const specText = this.nextElementSibling.textContent.trim().split(" - ")[0]; // Remove pricing from spec text
            const price = parseFloat(this.parentElement.getAttribute('data-price'));
            selectedSpec = { text: specText, price: price };
            updateSpecSummary();
            // Set default processor and color based on specification selection
            setDefaultValues(specText);
        });
    });

    function setDefaultValues(specText) {
        switch (specText) {
            case 'Basic':
                selectedProcessor = 'i3 Processor';
                selectedColor = 'Black';
                updateSummary();
                break;
            case 'Standard':
                selectedProcessor = 'i5 Processor';
                updateSummary();
                break;
            case 'Advanced':
                selectedProcessor = 'i7 Processor';
                selectedColor = 'Silver';
                updateSummary();
                break;
            default:
                // Do nothing for other specifications
                break;
        }
    }

    function filterSpecifications() {
        // Filter specifications based on selected processor and color
        specOptions.forEach(option => {
            const parentLabel = option.closest('.option');
            const processorMatch = parentLabel.getAttribute('data-processor') === selectedProcessor || selectedProcessor === '';
            const colorMatch = parentLabel.getAttribute('data-color') === selectedColor || selectedColor === '';

            parentLabel.style.display = processorMatch && colorMatch ? 'block' : 'none';
        });

        // If the currently selected specifications are not visible, clear the selection
        if (selectedSpec && !isSpecVisible(selectedSpec.text)) {
            clearSpecSummary();
            selectedSpec = null;
        }
    }

    function isSpecVisible(specText) {
        return Array.from(specOptions).some(option => option.nextElementSibling.textContent.trim().split(" - ")[0] === specText && option.checked);
    }

    function updateSpecSummary() {
        // Clear existing specification details and price
        clearSpecSummary();

        if (selectedSpec) {
            // Add the new spec details
            const specDetail = document.createElement('li');
            specDetail.textContent = selectedSpec.text;
            specDetail.className = 'spec-detail'; // Add a class for easy identification
            summaryDetails.appendChild(specDetail);

            // Add the new pricing detail
            const pricingDetail = document.createElement('li');
            pricingDetail.textContent = "$" + selectedSpec.price.toFixed(2); // Display price without "Pricing:" label
            pricingDetail.className = 'pricing-detail'; // Add a class for easy identification
            summaryDetails.appendChild(pricingDetail);
        }
    }

    function clearSpecSummary() {
        // Clear existing specification details
        const existingSpec = summaryDetails.querySelector('.spec-detail');
        if (existingSpec) {
            summaryDetails.removeChild(existingSpec);
        }

        // Clear existing pricing detail
        const existingPrice = summaryDetails.querySelector('.pricing-detail');
        if (existingPrice) {
            summaryDetails.removeChild(existingPrice);
        }
    }

    function updateSummary() {
        // Update the summary for processor, color, and specification
        summaryDetails.innerHTML = ''; // Clear previous summary details

        // Display processor and color regardless of specification selection
        if (selectedProcessor) {
            const processorDetail = document.createElement('li');
            processorDetail.textContent = selectedProcessor;
            summaryDetails.appendChild(processorDetail);
        }

        if (selectedColor) {
            const colorDetail = document.createElement('li');
            colorDetail.textContent = selectedColor;
            summaryDetails.appendChild(colorDetail);
        }

        // Display specification if selected
        if (selectedSpec) {
            const priceDetail = document.createElement('li');
            priceDetail.textContent = "$" + selectedSpec.price.toFixed(2); // Display price without "Pricing:" label
            summaryDetails.appendChild(priceDetail);
        }
    }

    function resetColorAndSpec() {
        // Reset color selection
        colorOptions.forEach(option => {
            option.checked = false;
        });

        // Reset specification selection
        specOptions.forEach(option => {
            option.checked = false;
        });
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const processorOptions = document.querySelectorAll('input[name="processor"]');
    const colorOptions = document.querySelectorAll('input[name="color"]');
    const specOptions = document.querySelectorAll('input[name="specifications"]');
    const summaryDetails = document.getElementById('summary-details');

    let selectedProcessor = '';
    let selectedColor = '';
    let selectedSpec = null;
    let actionHistory = [];  // Track the order of selections

    // Initially hide specifications
    hideSpecifications();

    processorOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedProcessor = this.nextElementSibling.textContent.trim();
            actionHistory.push('processor');  // Add to action history
            updateSummary();
            filterSpecifications();
        });
    });

    colorOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedColor = this.nextElementSibling.textContent.trim();
            actionHistory.push('color');  // Add to action history
            updateSummary();
            filterSpecifications();
        });
    });

    specOptions.forEach(option => {
        option.addEventListener('change', function() {
            updateSpecBasedSelection(this);
            actionHistory.push('specification');  // Add to action history
            updateSpecSummary();
        });
    });

    function hideSpecifications() {
        specOptions.forEach(option => {
            option.closest('.option').style.display = 'none';
        });
    }

    function updateSpecBasedSelection(optionElement) {
        selectedSpec = parseSpecDetails(optionElement);
    }

    function parseSpecDetails(optionElement) {
        const specText = optionElement.nextElementSibling.textContent.trim().split(" - ")[0];
        const price = parseFloat(optionElement.parentElement.getAttribute('data-price'));
        return { text: specText, price: price };
    }

    function filterSpecifications() {
        if (selectedProcessor || selectedColor) {  // Only display specifications if a processor or color is selected
            specOptions.forEach(option => {
                const parentLabel = option.closest('.option');
                const processorMatch = parentLabel.getAttribute('data-processor') === selectedProcessor || selectedProcessor === '';
                const colorMatch = parentLabel.getAttribute('data-color') === selectedColor || selectedColor === '';
                parentLabel.style.display = (processorMatch && colorMatch) ? 'block' : 'none';
            });
        }
    }

    function updateSummary() {
        summaryDetails.innerHTML = '';  // Clear previous details
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
    }

    function updateSpecSummary() {
        clearSpecSummary();
        if (selectedSpec) {
            const specDetail = document.createElement('li');
            specDetail.textContent = selectedSpec.text;
            specDetail.className = 'spec-detail';
            summaryDetails.appendChild(specDetail);

            const pricingDetail = document.createElement('li');
            pricingDetail.textContent = "$" + selectedSpec.price.toFixed(2);
            pricingDetail.className = 'pricing-detail';
            summaryDetails.appendChild(pricingDetail);
        }
    }

    function clearSpecSummary() {
        const existingSpec = summaryDetails.querySelector('.spec-detail');
        if (existingSpec) summaryDetails.removeChild(existingSpec);
        const existingPrice = summaryDetails.querySelector('.pricing-detail');
        if (existingPrice) summaryDetails.removeChild(existingPrice);
    }
});

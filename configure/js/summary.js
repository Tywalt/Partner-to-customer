document.addEventListener("DOMContentLoaded", function() {
    const processorOptions = document.querySelectorAll('input[name="processor"]');
    const colorOptions = document.querySelectorAll('input[name="color"]');
    const specOptions = document.querySelectorAll('input[name="specifications"]');
    const accessoriesOptions = document.querySelectorAll('input[name="accessories"]');
    const summaryDetails = document.getElementById('summary-details');
    const nextButton = document.querySelector('.btn-next');

    let selectedProcessor = '';
    let selectedColor = '';
    let selectedSpec = null;
    let selectedAccessories = [];

    // Initially hide specifications
    hideSpecifications();

    processorOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedProcessor = this.nextElementSibling.textContent.trim();
            updateSummary();
            filterSpecifications();
            highlightSelectedOption(processorOptions, this);
            removeErrorHighlighting();
            validateSelections();
        });
    });

    colorOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedColor = this.nextElementSibling.textContent.trim();
            updateSummary();
            filterSpecifications();
            highlightSelectedOption(colorOptions, this);
            removeErrorHighlighting();
            validateSelections();
        });
    });

    specOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedSpec = parseSpecDetails(this);
            updateSpecSummary();
            highlightSelectedOption(specOptions, this);
            removeErrorHighlighting();
            validateSelections();
        });
    });

    accessoriesOptions.forEach(option => {
        option.addEventListener('change', function() {
            const accessory = this.nextElementSibling.textContent.trim();
            if (this.checked) {
                selectedAccessories.push(accessory);
            } else {
                const index = selectedAccessories.indexOf(accessory);
                if (index !== -1) {
                    selectedAccessories.splice(index, 1);
                }
            }
            updateSummary();
            removeErrorHighlighting();
            validateSelections();
        });
    });

    function hideSpecifications() {
        specOptions.forEach(option => {
            option.closest('.option').style.display = 'none';
        });
    }

    function parseSpecDetails(optionElement) {
        const specText = optionElement.nextElementSibling.textContent.trim().split(" - ")[0];
        const price = parseFloat(optionElement.parentElement.getAttribute('data-price'));
        return { text: specText, price: price };
    }

    function filterSpecifications() {
        specOptions.forEach(option => {
            const parentLabel = option.closest('.option');
            const processorMatch = parentLabel.getAttribute('data-processor') === selectedProcessor || selectedProcessor === '';
            const colorMatch = parentLabel.getAttribute('data-color') === selectedColor || selectedColor === '';
            parentLabel.style.display = (processorMatch && colorMatch) ? 'block' : 'none';
        });
    }

    function updateSummary() {
        summaryDetails.innerHTML = '';
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
        selectedAccessories.forEach(accessory => {
            const accessoryDetail = document.createElement('li');
            accessoryDetail.textContent = accessory;
            summaryDetails.appendChild(accessoryDetail);
        });
    }

    function updateSpecSummary() {
        clearSpecSummary();
        if (selectedSpec) {
            const specDetail = document.createElement('li');
            specDetail.textContent = selectedSpec.text;
            specDetail.classList.add('spec-detail');
            summaryDetails.appendChild(specDetail);

            const pricingDetail = document.createElement('li');
            pricingDetail.textContent = "$" + selectedSpec.price.toLocaleString(undefined, { maximumFractionDigits: 2 });
            pricingDetail.classList.add('pricing-detail');
            summaryDetails.appendChild(pricingDetail);
        }
    }

    function clearSpecSummary() {
        const existingSpec = summaryDetails.querySelector('.spec-detail');
        if (existingSpec) summaryDetails.removeChild(existingSpec);
        const existingPrice = summaryDetails.querySelector('.pricing-detail');
        if (existingPrice) summaryDetails.removeChild(existingPrice);
    }

    function highlightSelectedOption(options, selectedOption) {
        options.forEach(option => {
            const optionBox = option.closest('.option');
            if (option === selectedOption) {
                optionBox.classList.add('checked');
            } else {
                optionBox.classList.remove('checked');
            }
        });
    }

    function removeErrorHighlighting() {
        document.querySelectorAll('.highlight-error').forEach(element => {
            element.classList.remove('highlight-error');
        });
    }

    function validateSelections() {
        const categories = ['processor', 'color', 'specifications'];
        categories.forEach(category => {
            const selected = document.querySelector(`input[name="${category}"]:checked`);
            const categoryContainer = document.querySelector(`[data-category="${category}"]`);
            if (!selected) {
                categoryContainer.classList.add('highlight-error');
            } else {
                categoryContainer.classList.remove('highlight-error');
            }
        });

        // Check if there are three accessories selected
        const accessoriesContainer = document.getElementById('Accessories');
        if (selectedAccessories.length !== 3) {
            accessoriesContainer.classList.add('highlight-error');
        } else {
            accessoriesContainer.classList.remove('highlight-error');
        }
    }

    function handleNextButtonClick() {
        validateSelections();
        if (document.querySelectorAll('.highlight-error').length > 0) {
            return;
        }
        console.log("All sections filled out. Proceeding to next step...");
    }

    nextButton.addEventListener('click', handleNextButtonClick);

    // Validate selections on page load and page show
    window.addEventListener('load', validateSelections);
    window.addEventListener('pageshow', validateSelections);
});

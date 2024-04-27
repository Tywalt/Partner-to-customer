document.addEventListener("DOMContentLoaded", function() {
    const processorOptions = document.querySelectorAll('input[name="processor"]');
    const colorOptions = document.querySelectorAll('input[name="color"]');
    const specOptions = document.querySelectorAll('input[name="specifications"]');
    const summaryDetails = document.getElementById('summary-details');

    let selectedProcessor = '';
    let selectedColor = '';
    let selectedSpec = null;

    // Initially hide specifications
    hideSpecifications();

    processorOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedProcessor = this.nextElementSibling.textContent.trim();
            updateSummary();
            filterSpecifications();
            highlightSelectedOption(processorOptions, this);
        });
    });

    colorOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedColor = this.nextElementSibling.textContent.trim();
            updateSummary();
            filterSpecifications();
            highlightSelectedOption(colorOptions, this);
        });
    });

    specOptions.forEach(option => {
        option.addEventListener('change', function() {
            selectedSpec = parseSpecDetails(this);
            updateSpecSummary();
            highlightSelectedOption(specOptions, this);
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
    }

    function updateSpecSummary() {
        clearSpecSummary();
        if (selectedSpec) {
            const specDetail = document.createElement('li');
            specDetail.textContent = selectedSpec.text;
            specDetail.classList.add('spec-detail'); // Add class for easy removal
            summaryDetails.appendChild(specDetail);

            const pricingDetail = document.createElement('li');
            pricingDetail.textContent = "$" + selectedSpec.price.toLocaleString(undefined, { maximumFractionDigits: 2 });
            pricingDetail.classList.add('pricing-detail'); // Add class for easy removal
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
                optionBox.classList.add('checked'); // Add class to simulate checked effect
            } else {
                optionBox.classList.remove('checked'); // Remove class to simulate unchecked effect
            }
        });
    }

    // Function to check if all sections are filled out
    function allSectionsFilled() {
        return selectedProcessor && selectedColor && selectedSpec;
    }

    // Function to highlight incomplete sections and options
    function highlightIncomplete() {
        if (!selectedProcessor) {
            processorOptions.forEach(option => {
                option.closest('.option').classList.add('highlight-error');
            });
        }
        if (!selectedColor) {
            colorOptions.forEach(option => {
                option.closest('.option').classList.add('highlight-error');
            });
        }
        if (!selectedSpec) {
            specOptions.forEach(option => {
                option.closest('.option').classList.add('highlight-error');
            });
        }
    }

    // Function to remove error highlighting
    function removeErrorHighlighting() {
        document.querySelectorAll('.highlight-error').forEach(element => {
            element.classList.remove('highlight-error');
        });
    }

    // Function to handle "Next" button click
    function handleNextButtonClick() {
        removeErrorHighlighting(); // Remove previous error highlighting
        if (!allSectionsFilled()) {
            highlightIncomplete(); // Highlight incomplete sections and options
            return; // Prevent further action if sections are incomplete
        }
        // Proceed with next step logic here
        console.log("All sections filled out. Proceeding to next step...");
    }

    // Attach "Next" button click event listener
    document.querySelector('.btn-next').addEventListener('click', handleNextButtonClick);
});

// Function to handle highlighting of options
function highlightOptions() {
    // Get all option elements
    var options = document.querySelectorAll('.option');

    // Remove any existing highlight classes
    options.forEach(function(option) {
        option.classList.remove('highlighted');
    });

    // Get the selected processor and color
    var selectedProcessor = document.querySelector('input[name="processor"]:checked').value;
    var selectedColor = document.querySelector('input[name="color"]:checked').value;

    // Find the option with the selected processor and color
    var selectedOption = document.querySelector('.option[data-processor="' + selectedProcessor + '"][data-color="' + selectedColor + '"]');

    // Add a red highlight class to the selected option
    selectedOption.classList.add('highlighted');
}

// Attach change event listeners to processor and color radio buttons
var processorRadioButtons = document.querySelectorAll('input[name="processor"]');
processorRadioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', highlightOptions);
});

var colorRadioButtons = document.querySelectorAll('input[name="color"]');
colorRadioButtons.forEach(function(radioButton) {
    radioButton.addEventListener('change', highlightOptions);
});

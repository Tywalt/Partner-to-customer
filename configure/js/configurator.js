document.addEventListener("DOMContentLoaded", function() {
    const nextButton = document.querySelector('.btn-next');
    const sections = document.querySelectorAll('.options');
    const progressBar = document.querySelector('.progress-bar');
    const totalPriceElement = document.getElementById('total-price');
    let currentSectionIndex = 0;
    let selections = {
        "Surface Pro 10 for Business": {
            processor: null,
            color: null,
            specifications: null,
        },
        "Add-Ons": [],
        "Accessories": []
    };


    // Updates the visual progress bar based on the current section index
    function updateProgressBar() {
        progressBar.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active');
            if (index <= currentSectionIndex) {
                step.classList.add('active');
            }
        });
    }

    // Navigates to the specified section index
    function navigateToSection(index) {
        if (index < currentSectionIndex || validateSection(true)) {
            sections[currentSectionIndex].classList.add('hidden');
            sections[index].classList.remove('hidden');
            currentSectionIndex = index;
            updateProgressBar();
            updateTotalPrice();
        }
    }

    // Validates the current section to ensure a selection has been made
    function validateSection(applyHighlight = false) {
        const currentSection = sections[currentSectionIndex];
        let allCategoriesValid = true;
        currentSection.querySelectorAll('.option-group').forEach(group => {
            const selectedInput = group.querySelector('input:checked');
            if (!selectedInput && applyHighlight) {
                group.querySelectorAll('.option').forEach(option => {
                    option.classList.add('highlight-error');
                });
                allCategoriesValid = false;
            } else {
                group.querySelectorAll('.option').forEach(option => {
                    option.classList.remove('highlight-error');
                    option.classList.remove('highlight-success');
                });
                if (selectedInput) {
                    selectedInput.closest('.option').classList.add('highlight-success');
                }
            }
        });
        return allCategoriesValid;
    }

    // Updates the summary of selected items
// Updates the summary of selected items
function updateSummary() {
    const summaryElement = document.getElementById('summary-details');
    summaryElement.innerHTML = ''; // Clear previous content

    const categories = {
        'Surface Pro 10 for Business': ['processor', 'color', 'specifications'],
        'Add-Ons': ['warranty'],
        'Accessories': ['accessories']
    };

    Object.keys(categories).forEach(category => {
        const keys = categories[category];
        let hasValues = false; // Flag to check if there are any values for this category
        keys.forEach(key => {
            const value = selections[key];
            if (value) {
                if (Array.isArray(value) && value.length > 0) {
                    hasValues = true; // There are values for this category
                } else if (typeof value === 'string' && value.trim() !== '') {
                    hasValues = true; // There are values for this category
                }
            }
        });

        if (hasValues) {
            // Add header only if there are values for this category
            const header = document.createElement('h3');
            header.textContent = category;
            summaryElement.appendChild(header);
            
            // Add content only if there are values for this category
            const contentContainer = document.createElement('div');
            contentContainer.className = 'summary-category';

            keys.forEach(key => {
                const value = selections[key];
                if (value) {
                    if (Array.isArray(value) && value.length > 0) {
                        value.forEach(item => {
                            const detail = document.createElement('p');
                            detail.textContent = item;
                            contentContainer.appendChild(detail);
                        });
                    } else if (typeof value === 'string' && value.trim() !== '') {
                        const detail = document.createElement('p');
                        detail.textContent = value;
                        contentContainer.appendChild(detail);
                    }
                }
            });

            summaryElement.appendChild(contentContainer);
        }
    });
}
    // Resets invalid specifications if selection criteria change
    function resetInvalidSpecifications() {
        selections.specifications = null;
    }

    // Applies filters based on selected processor and color
    function applyFilters() {
        const specificationOptions = document.querySelectorAll('.option[data-processor], .option[data-color]');
        let foundVisible = false;

        specificationOptions.forEach(option => {
            const processorMatch = option.dataset.processor === selections.processor || !selections.processor;
            const colorMatch = option.dataset.color === selections.color || !selections.color;
            if (processorMatch && colorMatch) {
                option.style.display = 'block';
                foundVisible = true;
            } else {
                option.style.display = 'none';
                const inputs = option.querySelectorAll('input');
                inputs.forEach(input => {
                    if (input.checked) {
                        input.checked = false;
                        const optionName = input.name;
                        selections[optionName] = null;
                    }
                });
            }
        });

        if (!foundVisible && selections.specifications) {
            resetInvalidSpecifications();
            updateSummary();
        }
    }

    // Updates the total price based on selections
    function updateTotalPrice() {
        let newTotalPrice = 0;
        document.querySelectorAll('.options input:checked').forEach(input => {
            const priceElement = input.closest('.option').querySelector('.price');
            if (priceElement && priceElement.dataset.price) {
                newTotalPrice += parseFloat(priceElement.dataset.price);
            }
        });
        totalPriceElement.textContent = `$${newTotalPrice.toFixed(2)}`;
    }

    // Handles changes in selections
    document.addEventListener('change', function(event) {
        const target = event.target;
        if (target.closest('.options')) {
            const name = target.name;
            if (target.type === 'radio' || target.type === 'checkbox') {
                // Handle changes in processor or color
                if (name === 'processor' || name === 'color') {
                    resetInvalidSpecifications();
                    selections[name] = target.nextElementSibling.textContent.trim();
                    applyFilters();
                } else if (target.type === 'checkbox') {
                    // Handle checkbox for warranty and accessories
                    const isChecked = target.checked;
                    const value = target.nextElementSibling.textContent.trim();
                    if (isChecked) {
                        if (!selections[name].includes(value)) {
                            selections[name].push(value);
                        }
                    } else {
                        selections[name] = selections[name].filter(item => item !== value);
                    }
                } else if (target.type === 'radio') {
                    // Update selection for radio buttons
                    selections[name] = target.nextElementSibling.textContent.trim();
                }
                updateSummary(); // Update the summary with the new selections
                updateTotalPrice(); // Update the total price on change
                validateSection(); // Validate the section for any input errors
            }
        }
    });
// Event listener for the 'Next' button
nextButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission
    if (validateSection(true)) {
        if (currentSectionIndex < sections.length - 1) {
            navigateToSection(currentSectionIndex + 1);
        } else {
            // Correctly format the selections object to be saved in localStorage
            const cartSelections = {
                "Surface Pro 10 for Business": selections["Surface Pro 10 for Business"],
                "Add-Ons": selections["Add-Ons"],
                "Accessories": selections["Accessories"]
            };
            // Save to local storage
            localStorage.setItem('cart', JSON.stringify(cartSelections));
            // Redirect to the cart page
            window.location.href = '/cart'; // Adjust this URL to your actual cart page
        }
    }
});
console.log(JSON.stringify(cartSelections));  // Check what is being saved
localStorage.setItem('cart', JSON.stringify(cartSelections));
window.location.href = '/cart';

    updateProgressBar();
    updateTotalPrice(); // Initial call to set the total price based on default selections
});
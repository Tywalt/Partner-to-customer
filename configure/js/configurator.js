document.addEventListener("DOMContentLoaded", function() {
    const nextButton = document.querySelector('.btn-next');
    const sections = document.querySelectorAll('.options');
    const progressBar = document.querySelector('.progress-bar');
    const totalPriceElement = document.getElementById('total-price');
    let currentSectionIndex = 0;
    let selections = {
        processor: null,
        color: null,
        specifications: null,
        warranty: [],
        accessories: []
    };

    function updateProgressBar() {
        progressBar.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active');
            if (index <= currentSectionIndex) {
                step.classList.add('active');
            }
        });
    }

    function navigateToSection(index) {
        if (index < currentSectionIndex || validateSection(true)) {
            sections[currentSectionIndex].classList.add('hidden');
            sections[index].classList.remove('hidden');
            currentSectionIndex = index;
            updateProgressBar();
            updateTotalPrice();
        }
    }

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

    function updateSummary() {
        const summaryElement = document.getElementById('summary-details');
        summaryElement.innerHTML = '';  // Clear previous content
    
        const categories = {
            'Surface Pro 10 for Business': ['processor', 'color', 'specifications'],
            'Add-Ons': ['warranty'],
            'Accessories': ['accessories']
        };
    
        Object.keys(categories).forEach(category => {
            let hasValues = false;
            const keys = categories[category];
            const contentContainer = document.createElement('div');
            contentContainer.className = 'summary-category';
    
            if (Array.isArray(keys)) {
                keys.forEach(key => {
                    const value = selections[key];
                    if (value) {
                        if (Array.isArray(value) && value.length > 0) {
                            // Handle arrays for multiple selections like warranty and accessories
                            value.forEach(item => {
                                hasValues = true;
                                const detail = document.createElement('p');
                                detail.textContent = item;
                                contentContainer.appendChild(detail);
                            });
                        } else if (typeof value === 'string' && value.trim() !== '') {
                            // Handle single selections like processor, color, specifications
                            hasValues = true;
                            const detail = document.createElement('p');
                            detail.textContent = selections[key];
                            contentContainer.appendChild(detail);
                        }
                    }
                });
            }
    
            if (hasValues) {
                const header = document.createElement('h3');
                header.textContent = category;
                summaryElement.appendChild(header);
                summaryElement.appendChild(contentContainer);
            }
        });
    }
    
    
    function resetInvalidSpecifications() {
        selections.specifications = null;
    }

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
    document.addEventListener('change', function(event) {
        const target = event.target;
        const name = target.name;
        if (target.closest('.options')) {
            if (target.type === 'radio' || target.type === 'checkbox') {
                // Reset and update for specifications if processor or color changes
                if (name === 'processor' || name === 'color') {
                    resetInvalidSpecifications();
                    selections[name] = target.nextElementSibling.textContent.trim();
                    applyFilters();
                } else if (target.type === 'checkbox') {
                    const isChecked = target.checked;
                    const value = target.nextElementSibling.textContent.trim();
                    if (isChecked) {
                        // Add to the selections if checked
                        if (!selections[name].includes(value)) {
                            selections[name].push(value);
                        }
                    } else {
                        // Remove from the selections if unchecked
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
    
    document.querySelectorAll('.options').forEach(section => {
        section.addEventListener('change', function() {
            updateSummary();
        });
    });

    nextButton.addEventListener('click', function() {
        if (validateSection(true)) {
            if (currentSectionIndex < sections.length - 1) {
                navigateToSection(currentSectionIndex + 1);
            } else {
                // Save selections to local storage
                localStorage.setItem('cart', JSON.stringify(selections));
                // Redirect to the cart page
                window.location.href = 'https://neloxis.com/cart';
            }
        }
    });
    
    updateProgressBar();
    updateTotalPrice(); // Initial call to set the total price based on default selections
});

document.addEventListener("DOMContentLoaded", function() {
    const nextButton = document.querySelector('.btn-next');
    const sections = document.querySelectorAll('.options');
    const progressBar = document.querySelector('.progress-bar');
    let currentSectionIndex = 0;
    let selections = {
        processor: null,
        color: null,
        specifications: null,
        warranty: null,
        accessories: null
    };

    // Update progress bar and handle section navigation
    function updateProgressBar() {
        progressBar.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active');
            if (index <= currentSectionIndex) {
                step.classList.add('active');
                step.addEventListener('click', () => navigateToSection(index));
            }
        });
    }

    function navigateToSection(index) {
        if (index < currentSectionIndex || validateSection(true)) {
            sections[currentSectionIndex].classList.add('hidden');
            sections[index].classList.remove('hidden');
            currentSectionIndex = index;
            updateProgressBar();
        }
    }

    // Validation and real-time updates
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

    // Update summary
    function updateSummary() {
        const summaryElement = document.getElementById('summary-details');
        summaryElement.innerHTML = ''; // Clear existing summary details

        const displayOrder = ['processor', 'color', 'specifications', 'warranty', 'accessories'];
        displayOrder.forEach(key => {
            const value = selections[key];
            if (value) {
                if (Array.isArray(value)) {
                    value.forEach(item => {
                        const li = document.createElement('li');
                        li.textContent = item;
                        summaryElement.appendChild(li);
                    });
                } else {
                    const li = document.createElement('li');
                    li.textContent = value;
                    summaryElement.appendChild(li);
                }
            }
        });
    }

    // Function to reset the specifications if the new filter makes them invalid
    function resetInvalidSpecifications() {
        selections.specifications = null; // Reset specifications in selections object
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
                // Reset any input elements within hidden options
                const inputs = option.querySelectorAll('input');
                inputs.forEach(input => {
                    if (input.checked) {
                        input.checked = false; // Clear selection
                        const optionName = input.name;
                        selections[optionName] = null; // Clear the stored selection
                    }
                });
            }
        });
    
        if (!foundVisible && selections.specifications) {
            resetInvalidSpecifications();
            updateSummary(); // Update the summary as specifications might have changed
        }
    }
    

    // Event listeners for all inputs
    sections.forEach(section => {
        section.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
            input.addEventListener('change', function() {
                if (input.name === 'processor' || input.name === 'color') {
                    // Clear specifications if processor or color is changed
                    resetInvalidSpecifications();
                    selections[input.name] = input.nextElementSibling.textContent.trim();
                    applyFilters();
                    updateSummary();
                } else if (input.type === 'checkbox' && section.id === "Accessories") {
                    // Handle checkbox behavior for accessories
                    selections[input.name] = input.checked ? input.nextElementSibling.textContent.trim() : null;
                    updateSummary();
                } else if (input.type === 'radio') {
                    // Handle radio button behavior for other options
                    selections[input.name] = input.nextElementSibling.textContent.trim();
                    updateSummary();
                }
                validateSection();
            });
        });
    });

    nextButton.addEventListener('click', function() {
        if (validateSection(true)) {
            if (currentSectionIndex < sections.length - 1) {
                navigateToSection(currentSectionIndex + 1);
            } else {
                // Redirect on the last section
                window.location.href = 'https://neloxis.com';
            }
        }
    });

    updateProgressBar();
});

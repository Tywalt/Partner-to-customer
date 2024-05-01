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
        warranty: null,
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
            // Update the price considering changes may affect hidden sections
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
        summaryElement.innerHTML = '';

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
        if (event.target.closest('.options') && (event.target.type === 'radio' || event.target.type === 'checkbox')) {
            if (event.target.name === 'processor' || event.target.name === 'color') {
                resetInvalidSpecifications();
                selections[event.target.name] = event.target.nextElementSibling.textContent.trim();
                applyFilters();
                updateSummary();
            } else if (event.target.type === 'checkbox') {
                selections[event.target.name] = event.target.checked ? event.target.nextElementSibling.textContent.trim() : null;
                updateSummary();
            } else if (event.target.type === 'radio') {
                selections[event.target.name] = event.target.nextElementSibling.textContent.trim();
                updateSummary();
            }
            validateSection();
            updateTotalPrice(); // Update the total price on change
        }
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
    updateTotalPrice(); // Initial call to set the total price based on default selections
});

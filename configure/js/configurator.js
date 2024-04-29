document.addEventListener("DOMContentLoaded", function() {
    const nextButton = document.querySelector('.btn-next');
    const sections = document.querySelectorAll('.options');
    const progressBar = document.querySelector('.progress-bar');
    let currentSectionIndex = 0;
    let selections = {
        processor: null,
        color: null
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

    // Update summary and apply filters
    function updateSummary() {
        const summaryElement = document.getElementById('summary-details');
        summaryElement.innerHTML = '';
        Object.entries(selections).forEach(([key, value]) => {
            if (value) {
                const li = document.createElement('li');
                li.textContent = value;
                summaryElement.appendChild(li);
            }
        });
    }

    function applyFilters() {
        const specificationOptions = document.querySelectorAll('.options[data-category="specifications"] .option');
        specificationOptions.forEach(option => {
            const processorMatch = option.dataset.processor === selections.processor;
            const colorMatch = option.dataset.color === selections.color;
            option.style.display = (processorMatch && colorMatch) ? 'block' : 'none';
        });
    }

    // Event listeners for all inputs
    sections.forEach(section => {
        section.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
            input.addEventListener('change', function() {
                selections[input.name] = input.nextElementSibling.textContent.trim();
                validateSection();
                updateSummary();
                if (input.name === 'processor' || input.name === 'color') {
                    applyFilters();
                }
            });
        });
    });

    nextButton.addEventListener('click', function() {
        if (validateSection(true)) {
            updateSummary();
            if (currentSectionIndex < sections.length - 1) {
                navigateToSection(currentSectionIndex + 1);
            } else {
                window.location.href = 'https://neloxis.com'; // Redirect on the last section
            }
        }
    });

    updateProgressBar();
});

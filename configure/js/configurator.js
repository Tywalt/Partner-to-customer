document.addEventListener("DOMContentLoaded", function() {
    const nextButton = document.querySelector('.btn-next');
    const sections = document.querySelectorAll('.options');
    const progressBar = document.querySelector('.progress-bar');
    let currentSectionIndex = 0;

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

    function validateSection(applyHighlight = false) {
        const currentSection = sections[currentSectionIndex];
        let allCategoriesValid = true;

        const optionGroups = currentSection.querySelectorAll('.option-group');
        optionGroups.forEach(group => {
            const inputs = group.querySelectorAll('input[type="radio"], input[type="checkbox"]');
            const selectedInput = Array.from(inputs).find(input => input.checked);
            if (!selectedInput) {
                if (applyHighlight) {
                    inputs.forEach(input => {
                        input.closest('.option').classList.add('highlight-error');
                        input.closest('.option').classList.remove('highlight-success');
                    });
                }
                allCategoriesValid = false;
            } else {
                inputs.forEach(input => {
                    input.closest('.option').classList.remove('highlight-error');
                    if (input === selectedInput) {
                        input.closest('.option').classList.add('highlight-success');
                    } else {
                        input.closest('.option').classList.remove('highlight-success');
                    }
                });
            }
        });

        return allCategoriesValid;
    }

    function updateSummary() {
        const summaryElement = document.getElementById('summary-details');
        summaryElement.innerHTML = '';  // Clear existing entries
    
        // Loop through each section and append only the values of checked inputs
        sections.forEach(section => {
            section.querySelectorAll('.option-group').forEach(group => {
                const input = group.querySelector('input:checked');
                if (input) {
                    const value = input.nextElementSibling.textContent.trim();
                    const li = document.createElement('li');
                    li.textContent = value;  // Append only the value
                    summaryElement.appendChild(li);
                }
            });
        });
    }
    

    sections.forEach(section => {
        section.querySelectorAll('.option-group').forEach(group => {
            group.querySelectorAll('input').forEach(input => {
                input.addEventListener('change', function() {
                    validateSection(); // Validate and update highlights immediately on change
                    updateSummary(); // Update summary in real time
                });
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
        } else {
            alert('Please select an option in each category before proceeding.');
        }
    });

    updateProgressBar();
});

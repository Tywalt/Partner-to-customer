document.addEventListener("DOMContentLoaded", function() {
    const processorOptions = document.querySelectorAll('input[name="processor"]');
    const colorOptions = document.querySelectorAll('input[name="color"]');
    const specOptions = document.querySelectorAll('input[name="specifications"]');
    const summaryDetails = document.getElementById('summary-details');
    const nextButton = document.querySelector('.btn-next');

    processorOptions.forEach(option => option.addEventListener('change', () => updateOptions('processor')));
    colorOptions.forEach(option => option.addEventListener('change', () => updateOptions('color')));
    specOptions.forEach(option => option.addEventListener('change', handleSelectionChange));

    function updateOptions(changed) {
        clearErrorHighlights();
        if (changed !== 'specifications') {
            resetSpecifications();
        }
        updateSelections();
        filterSpecifications();
        updateSummary();
    }

    function resetSpecifications() {
        specOptions.forEach(option => {
            option.checked = false; // Explicitly uncheck all specifications when changing processors or colors
            option.closest('.option').classList.remove('checked');
        });
    }

    function handleSelectionChange() {
        clearErrorHighlights();
        specOptions.forEach(option => { // Explicitly ensure that no other specifications are checked
            option.closest('.option').classList.remove('checked');
        });
        this.closest('.option').classList.add('checked');
        updateSummary();
    }

    function filterSpecifications() {
        const selectedProcessorName = document.querySelector('input[name="processor"]:checked')?.nextElementSibling.textContent.trim();
        const selectedColorName = document.querySelector('input[name="color"]:checked')?.nextElementSibling.textContent.trim();
        specOptions.forEach(option => {
            const matchesProcessor = option.closest('.option').getAttribute('data-processor') === selectedProcessorName;
            const matchesColor = option.closest('.option').getAttribute('data-color') === selectedColorName;
            option.closest('.option').style.display = (matchesProcessor && matchesColor) ? 'block' : 'none';
        });
    }

    function updateSelections() {
        const selections = [processorOptions, colorOptions, specOptions];
        selections.forEach(group => {
            group.forEach(option => {
                if (option.checked) {
                    option.closest('.option').classList.add('checked');
                } else {
                    option.closest('.option').classList.remove('checked');
                }
            });
        });
    }

    function clearErrorHighlights() {
        document.querySelectorAll('.option').forEach(option => {
            option.classList.remove('highlight-error');
        });
    }

    function updateSummary() {
        summaryDetails.innerHTML = '';
        const selectedProcessorText = document.querySelector('input[name="processor"]:checked')?.nextElementSibling.textContent.trim();
        const selectedColorText = document.querySelector('input[name="color"]:checked')?.nextElementSibling.textContent.trim();
        const selectedSpecText = document.querySelector('input[name="specifications"]:checked')?.nextElementSibling.textContent.trim();
        const selectedSpecPrice = document.querySelector('input[name="specifications"]:checked')?.closest('.option').getAttribute('data-price');

        if (selectedProcessorText) {
            const processorLi = document.createElement('li');
            processorLi.textContent = selectedProcessorText;
            summaryDetails.appendChild(processorLi);
        }
        if (selectedColorText) {
            const colorLi = document.createElement('li');
            colorLi.textContent = selectedColorText;
            summaryDetails.appendChild(colorLi);
        }
        if (selectedSpecText) {
            const specLi = document.createElement('li');
            specLi.textContent = selectedSpecText.split(" - ")[0];
            summaryDetails.appendChild(specLi);
        }
        if (selectedSpecPrice) {
            const priceLi = document.createElement('li');
            priceLi.textContent = `$${parseFloat(selectedSpecPrice).toFixed(2)}`;
            summaryDetails.appendChild(priceLi);
        }
    }

    nextButton.addEventListener('click', function() {
        clearErrorHighlights();
        checkAllSectionsFilled();
    });

    function checkAllSectionsFilled() {
        let allFilled = true;
        [processorOptions, colorOptions, specOptions].forEach(group => {
            if (!Array.from(group).some(option => option.checked)) {
                allFilled = false;
                Array.from(group).forEach(option => option.closest('.option').classList.add('highlight-error'));
            }
        });

        if (!allFilled) {
            console.error("Please complete all selections.");
        } else {
            console.log("All sections filled out. Proceeding to next step...");
            // Additional logic here for moving to the next step
        }
    }
});

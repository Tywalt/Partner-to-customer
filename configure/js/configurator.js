document.addEventListener("DOMContentLoaded", function() {
    const nextButtons = document.querySelectorAll('.btn-next');
    const sections = document.querySelectorAll('.options');
    const progressBar = document.querySelector('.progress-bar');
    let currentSectionIndex = 0;

    // Handle clicking on the 'Next' button
    nextButtons.forEach(button => button.addEventListener('click', function() {
        // If the current section is valid, move to the next one
        if (checkAllOptionsSelected(sections[currentSectionIndex])) {
            moveToNextSection();
        } else {
            // If not all options are selected, highlight the ones that are missing
            highlightUnselectedOptions(sections[currentSectionIndex], true);
        }
    }));

    // Move to the next section logic
    function moveToNextSection() {
        const currentSection = sections[currentSectionIndex];
        const nextSection = sections[currentSectionIndex + 1] || sections[0];
        transitionSections(currentSection, nextSection);
    }

    // Handle the transition between sections
    function transitionSections(currentSection, nextSection) {
        currentSection.classList.add('hidden');
        nextSection.classList.remove('hidden');
        updateProgressBar(currentSectionIndex + 1);
        currentSectionIndex = Array.from(sections).indexOf(nextSection);
        // No need to highlight unselected options on transition
    }

    // Update the progress bar based on the current section
    function updateProgressBar(stepNumber) {
        progressBar.querySelectorAll('.step-circle').forEach((circle, index) => {
            circle.setAttribute('fill', index < stepNumber ? '#007bff' : 'none');
        });
    }

    // Check if all required options are selected in the current section
    function checkAllOptionsSelected(section) {
        const optionGroups = section.querySelectorAll('.option-group');
        return Array.from(optionGroups).every(group => {
            const selected = group.querySelector('input[type="radio"]:checked');
            return selected !== null;
        });
    }

    // Highlight unselected options if needed
    function highlightUnselectedOptions(section, highlightErrors) {
        const optionGroups = section.querySelectorAll('.option-group');
        optionGroups.forEach(group => {
            const selected = group.querySelector('input[type="radio"]:checked');
            group.querySelectorAll('.option').forEach(option => {
                option.classList.remove('checked', 'highlight-error');
                if (selected && option.contains(selected)) {
                    option.classList.add('checked');
                } else if (!selected && highlightErrors) {
                    option.classList.add('highlight-error');
                }
            });
        });
    }

    // Event listener for radio button changes
    sections.forEach(section => {
        section.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', function() {
                // Remove 'checked' class from all options in the same group
                const groupName = input.getAttribute('name');
                section.querySelectorAll(`input[name="${groupName}"]`).forEach(inp => {
                    inp.closest('.option').classList.remove('checked');
                });
                // Add 'checked' class to the clicked option
                input.closest('.option').classList.add('checked');
            });
        });
    });

    // Navigation between sections
    document.querySelectorAll('.step-label').forEach(label => {
        label.addEventListener('click', function() {
            const targetId = this.textContent.trim().toLowerCase().replace(/\s+/g, '');
            const targetSection = document.getElementById(targetId);
            sections.forEach(sec => sec.classList.add('hidden'));
            targetSection.classList.remove('hidden');
            const newSectionIndex = Array.from(sections).indexOf(targetSection);
            updateProgressBar(newSectionIndex);
            currentSectionIndex = newSectionIndex;
        });
    });
});

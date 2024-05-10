// form-handler.js
document.getElementById('kt_contact_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    var formData = new FormData(this); // Collect all the form data

    fetch('send_mail.php', { // Assuming send_mail.php is in the same directory as the HTML file
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) // Convert the response to text
    .then(data => {
        alert(data); // Alert with the PHP script response
        this.reset(); // Reset the form after successful data submission
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending the form.');
    });
});

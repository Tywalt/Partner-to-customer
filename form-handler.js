// form-handler.js
document.getElementById('kt_contact_form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    var formData = new FormData(this); // Gather form data

    fetch('../send_mail.php', { // Specify the PHP script URL
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert('Email sent successfully!'); // Alert or handle response data
        this.reset(); // Reset the form after submission
    })
    .catch(error => {
        console.error('Error sending the form:', error);
        alert('Failed to send email.');
    });
});

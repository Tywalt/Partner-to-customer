document.addEventListener('DOMContentLoaded', function() {
    const date = new Date(); // Gets today's date
    date.setDate(date.getDate() + 3); // Adds 3 days
  
    const options = { month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString('en-US', options); // Format date
  
    // Update the shipping info text
    document.getElementById('shipping-info').textContent = `Get it as soon as ${dateString}`;
  });
  
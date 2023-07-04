// Get all price spans
const priceSpans = document.querySelectorAll('.price-td');

// Get the price panel and selected price element
const pricePanel = document.getElementById('pricePanel');
const selectedPriceElement = document.getElementById('selectedPrice');

// Add click event listener to each price span
priceSpans.forEach(priceSpan => {
  priceSpan.addEventListener('click', () => {
    const selectedPrice = priceSpan.textContent;
    
    // Set the selected price in the panel
    selectedPriceElement.textContent = selectedPrice;
    
    // Show the price panel
    pricePanel.style.display = 'block';
  });
});

// Hide the price panel when clicking outside of it
document.addEventListener('click', (event) => {
  if (!pricePanel.contains(event.target)) {
    pricePanel.style.display = 'none';
  }
});

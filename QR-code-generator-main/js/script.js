const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;
  const color = document.getElementById('color').value; // Get the color value

  // Validate url
  if (url === '') {
    alert('Please enter a URL');
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size, color); // Pass color to function

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector('img').src;
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

// Generate QR code with color
const generateQRCode = (url, size, color) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
    colorDark: color, // Set QR code color
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.className = 'save-btn'; // Apply the new class
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';

  const container = document.createElement('div');
  container.className = 'button-container'; // Center the button
  container.appendChild(link);

  document.getElementById('generated').appendChild(container);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);

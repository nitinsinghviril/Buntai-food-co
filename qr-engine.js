// UPI QR Code Generator
function generateUPIQR(upiId, name, amount) {
  const upiString = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
  return upiString;
}

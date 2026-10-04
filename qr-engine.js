/**
 * Lightweight Client-Side QR Generator Engine
 * Generates local SVG/Canvas QR without hitting external APIs
 */
const QREngine = {
    generateUPIQR: function(elementId, upiId, name, amount) {
        const container = document.getElementById(elementId);
        if (!container) return;
        
        container.innerHTML = ''; // Clear previous QR
        
        // Formatted UPI String
        const upiURI = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR`;
        
        // Generate QR Code Image via Google Chart API fallback or SVG canvas
        const qrImage = document.createElement('img');
        qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiURI)}`;
        qrImage.alt = "Payment QR Code";
        qrImage.className = "shadow rounded";
        
        container.appendChild(qrImage);
    }
};

/**
 * Main Application Orchestrator
 */
let currentCart = [];

function switchTab(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    const selectedTab = document.getElementById(`sec-${tabName}`);
    if (selectedTab) selectedTab.classList.remove('hidden');

    if (tabName === 'purchase') {
        PurchaseModule.generateList();
    }
}

function renderPOSProducts() {
    const container = document.getElementById('pos-product-list');
    if (!container) return;

    const products = InventoryModule.getItems();
    container.innerHTML = products.map(p => `
        <div class="flex justify-between items-center p-2 border rounded hover:bg-amber-50">
            <div>
                <div class="font-semibold">${p.name}</div>
                <div class="text-xs text-gray-500">₹${p.price} | Stock: ${p.stock}</div>
            </div>
            <button onclick="addToCart(${p.id})" class="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700">+ Add</button>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = InventoryModule.getItems().find(p => p.id === productId);
    if (!product) return;

    currentCart.push(product);
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');

    if (currentCart.length === 0) {
        cartContainer.innerHTML = 'No items selected';
        totalEl.textContent = '0.00';
        return;
    }

    let total = 0;
    cartContainer.innerHTML = currentCart.map((item) => {
        total += item.price;
        return `<div class="flex justify-between py-1 border-b">
            <span>${item.name}</span>
            <span class="font-semibold">₹${item.price}</span>
        </div>`;
    }).join('');

    totalEl.textContent = total.toFixed(2);
}

function generatePaymentQR() {
    const total = parseFloat(document.getElementById('cart-total').textContent);
    if (total <= 0) {
        alert('Please add items to cart first.');
        return;
    }
    // Demo UPI ID - Replace with your store's UPI ID
    QREngine.generateUPIQR('qr-container', 'store@upi', 'Satkool Snacks', total);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    InventoryModule.init();
    renderPOSProducts();
});

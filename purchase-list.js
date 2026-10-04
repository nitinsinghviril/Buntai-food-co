/**
 * Purchase List Generation Module
 * Scans stock thresholds and builds reorder lists & WhatsApp summaries
 */
const PurchaseModule = {
    generateList: function() {
        const items = InventoryModule.getItems();
        const container = document.getElementById('purchase-list-container');
        if (!container) return;

        // Filter items below or equal to minimum threshold
        const reorderItems = items.filter(item => item.stock <= item.minThreshold);

        if (reorderItems.length === 0) {
            container.innerHTML = `<div class="p-4 text-emerald-700 bg-emerald-50 rounded border border-emerald-200">
                All inventory levels are healthy! No reorders required right now.
            </div>`;
            return;
        }

        let totalEstimatedCost = 0;
        let whatsappText = " *Purchase Order Request*\n\n";

        let html = `
            <div class="mb-4 text-sm text-gray-600">
                Items highlighted below are at or below their required reorder threshold.
            </div>
            <table class="w-full text-left border-collapse mb-4">
                <thead>
                    <tr class="border-b bg-orange-100">
                        <th class="p-2">Item Name</th>
                        <th class="p-2">Current Stock</th>
                        <th class="p-2">Suggested Order</th>
                        <th class="p-2">Est. Cost</th>
                    </tr>
                </thead>
                <tbody>
        `;

        reorderItems.forEach(item => {
            const suggestedQty = (item.minThreshold * 2) - item.stock; // Reorder to 2x threshold
            const cost = suggestedQty * item.unitCost;
            totalEstimatedCost += cost;

            whatsappText += `• *${item.name}*: Order ${suggestedQty} units (Current: ${item.stock})\n`;

            html += `
                <tr class="border-b">
                    <td class="p-2 font-medium">${item.name}</td>
                    <td class="p-2 text-red-600 font-bold">${item.stock}</td>
                    <td class="p-2 font-semibold text-blue-600">${suggestedQty} units</td>
                    <td class="p-2">₹${cost.toFixed(2)}</td>
                </tr>
            `;
        });

        whatsappText += `\n*Total Estimated Cost:* ₹${totalEstimatedCost.toFixed(2)}`;

        html += `
                </tbody>
            </table>
            <div class="flex justify-between items-center pt-2 border-t">
                <span class="font-bold text-lg">Total Estimated Cost: ₹${totalEstimatedCost.toFixed(2)}</span>
                <button onclick="PurchaseModule.shareWhatsApp('${encodeURIComponent(whatsappText)}')" class="bg-emerald-600 text-white px-4 py-2 rounded font-semibold hover:bg-emerald-700">
                    Send Order via WhatsApp
                </button>
            </div>
        `;

        container.innerHTML = html;
    },

    shareWhatsApp: function(encodedText) {
        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    }
};

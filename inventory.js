/**
 * Inventory Management Module
 * Uses local state caching to prevent excessive Supabase reads/writes
 */
const InventoryModule = (function() {
    // Local memory cache
    let inventoryData = [
        { id: 1, name: "Makhana Classic 100g", stock: 12, minThreshold: 20, unitCost: 80, price: 120 },
        { id: 2, name: "Roasted Peanuts 200g", stock: 45, minThreshold: 15, unitCost: 35, price: 60 },
        { id: 3, name: "Peri Peri Makhana 100g", stock: 5, minThreshold: 25, unitCost: 85, price: 130 },
        { id: 4, name: "Salted Cashews 150g", stock: 8, minThreshold: 10, unitCost: 150, price: 220 }
    ];

    function renderTable() {
        const tbody = document.getElementById('inventory-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = inventoryData.map(item => `
            <tr class="border-b hover:bg-amber-50">
                <td class="p-2 font-medium">${item.name}</td>
                <td class="p-2 ${item.stock <= item.minThreshold ? 'text-red-600 font-bold' : 'text-slate-700'}">${item.stock}</td>
                <td class="p-2 text-gray-500">${item.minThreshold}</td>
                <td class="p-2">₹${item.unitCost.toFixed(2)}</td>
            </tr>
        `).join('');
    }

    return {
        getItems: () => inventoryData,
        init: function() {
            renderTable();
        }
    };
})();

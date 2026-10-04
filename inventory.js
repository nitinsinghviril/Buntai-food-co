// Inventory Management Module
const InventoryModule = {
  items: [
    { id: 1, name: 'Oil (L)', quantity: 20, unit: 'Liters' },
    { id: 2, name: 'Plates', quantity: 150, unit: 'Pcs' }
  ],
  
  getItems() {
    return this.items;
  },

  addItem(item) {
    this.items.push(item);
  }
};

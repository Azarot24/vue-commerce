import { defineStore } from 'pinia'
export const useCartStore = defineStore({
  id: 'cart',
  state: () => ({
    items: []
  }),
  actions: {
    addToCart(product) {
      const existingProduct = this.items.find(item => item.product.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        this.items.push({ product, quantity: 1 });
      }
    },
    removeFromCart(index) {
      this.items.splice(index, 1);
    },
    clearCart() {
      this.items = [];
    }
  },
  getters: {
    totalItems() {
      return this.items.length;
    }
  }
});

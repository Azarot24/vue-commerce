<template>
    <div>
      <h1>Carrito de Compra</h1>
      <div v-if="cart.length === 0">
        <p>El carrito está vacío.</p>
      </div>
      <div v-else>
        <div v-for="(item, index) in cart" :key="index" class="cart-item">
          <img :src="item.product.thumbnail" :alt="item.product.title" class="cart-item-image">
          <div class="cart-item-details">
            <h3>{{ item.product.title }}</h3>
            <p>Cantidad: {{ item.quantity }}</p>
            <p>Precio unitario: {{ item.product.price }}</p>
            <p>Total: {{ item.quantity * item.product.price }}</p>
            <button @click="removeFromCart(index)">Eliminar</button>
          </div>
        </div>
        <div class="cart-summary">
          <p>Total a pagar: {{ total }}</p>
          <button @click="checkout">Pagar</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
    import { useCartStore } from '../stores/cartList'
  export default {
    data() {
      return {
        cart: []
      };
    },
    computed: {
      total() {
        return this.cart.reduce((total, item) => total + (item.quantity * item.product.price), 0);
      }
    },
    methods: {
      removeFromCart(index) {
        useCartStore().removeFromCart(index);
        this.cart = useCartStore().items;
      },
      checkout() {
        useCartStore().clearCart();
        this.cart = useCartStore().items;
        alert('Gracias por su compra.')
      }
    },
    mounted() {
      this.cart = useCartStore().items
    },
  };
  </script>
  
  <style scoped>
  .cart-item {
    display: flex;
    margin-bottom: 20px;
  }
  .cart-item-image {
    width: 100px;
    height: auto;
    margin-right: 10px;
  }
  .cart-item-details {
    flex: 1;
  }
  .cart-summary {
    margin-top: 20px;
  }
  </style>
  
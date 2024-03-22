<template>
    <div class="product-thumbnail">
      <img :src="product.thumbnail" alt="Product Thumbnail">
      <h3>{{ product.title }}</h3>
      <Rating :rate="product.rating" />
      <p>%{{ product.discountPercentage }} off</p>
      <p>${{ product.price }}</p>
      <router-link :to="{ name: 'detail', params: { id: product.id } }">Ver detalles</router-link>
    </div>
  </template>
  
  <script>
  import Rating from './Rating.vue';
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    },
    components: {
      Rating
    }
  };
  </script>
  
  <style scoped>
  .product-thumbnail {
    width: 200px;
    padding: 10px;
    border: 1px solid #ccc;
    margin: 10px;
  }
  .product-thumbnail img {
    max-width: 100%;
    height: 200px;
    object-fit: contain;
  }
  </style>
  
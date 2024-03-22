<template>
  <div>
    <h1>{{ product.title }}</h1>
    <div>
      <img :src="product.thumbnail" :alt="product.name">
    </div>
    <h2>{{ product.description }}</h2>
    <p>%{{ product.discountPercentage }} off</p>
    <p>Precio: ${{ product.price }}</p>
    <Rating :rate="product.rating" />
    <p>Stock: {{ product.stock }}</p>
    <p>Marca: {{ product.brand }}</p>
    <button @click="addToCart">Agregar al carrito</button>
    <div class="img-cont">
      <img v-for="(image, index) in product.images" :key="index" :src="image" alt="Slide Image">
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  import Rating from '../components/Rating.vue';
  import { useCartStore } from '../stores/cartList'
  export default {
    data() {
      return {
        product: {}
      };
    },
    components: {
      Rating
    },
    created() {
      this.fetchProductDetail(this.$route.params.id);
    },
    methods: {
      fetchProductDetail(id) {
        // console.log(id)
        axios.get('https://dummyjson.com/products/'+id)
        .then(response => {
            this.product = response.data;
        })
        .catch(error => {
            console.error('Error al obtener productos:', error);
        });
      },
      addToCart() {
        useCartStore().addToCart(this.product)
        alert('Articulo agregado al carrito.')
      }
    },
  };
  </script>
  
  <style scoped>
  .img-cont {
    display: flex;
    align-content: center;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .img-cont img {
    margin: 10px;
    object-fit: contain;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  </style>
  
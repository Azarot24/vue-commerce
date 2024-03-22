<template>
  <main>
    <div>
      <div class="filter-cont">
        <label>Precio máximo:</label>
        <input type="number" v-model="maxPrice" min="0">
  
        <label>Descuento minimo:</label>
        <input type="number" v-model="minDiscount" min="0">
        
        <label>Existencia minima:</label>
        <input type="number" v-model="minStock" min="0">
      </div>
      
      <div class="filter-cont">
        <label>Categoría:</label>
        <select v-model="selectedCategory">
          <option value="">Todos</option>
          <option v-for="category in categories" :key="category">{{ category }}</option>
        </select>
        
        <label>Marca:</label>
        <select v-model="selectedBrand">
          <option value="">Todos</option>
          <option v-for="brand in brands" :key="brand">{{ brand }}</option>
        </select>
  
        <label>Calificación:</label>
        <select v-model="selectedRate">
          <option value="">Todos</option>
          <option value=1><span>&#9733;</span></option>
          <option value=2><span>&#9733;&#9733;</span></option>
          <option value=3><span>&#9733;&#9733;&#9733;</span></option>
          <option value=4><span>&#9733;&#9733;&#9733;&#9733;</span></option>
          <option value=5><span>&#9733;&#9733;&#9733;&#9733;&#9733;</span></option>
        </select>
      </div>
    </div>
    <div class="product-list" v-if="filteredProducts.length > 0">
      <item-product
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    <div v-else>
      <p>No se encontraron productos que coincidan con los criterios de búsqueda.</p>
    </div>
  </main>
</template>

<script>
  import axios from 'axios';
  import ItemProduct from '../components/ItemProduct.vue';
  export default {
  components: { ItemProduct },
    name: 'list',
    data() {
      return {
        products: [],
        categories: [],
        maxPrice: '',
        minDiscount: '',
        minStock: '',
        selectedCategory: '',
        selectedRate: '',
        selectedBrand: '',
      };
    },
    mounted() {
      this.fetchProducts();
      this.fetchCategories();
    },
    methods: {
      fetchProducts() {
        axios.get('https://dummyjson.com/products?limit=0')
          .then(response => {
            this.products = response.data.products;
          })
          .catch(error => {
            console.error('Error al obtener productos:', error);
          });
      },
      fetchCategories() {
        axios.get('https://dummyjson.com/products/categories')
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            console.error('Error al obtener productos:', error);
          });
      }
    },
    computed: {
      filteredProducts() {
        let filtered = this.products;

        // Filtrar por precio max
        if (this.maxPrice !== '') {
          filtered = filtered.filter(product => product.price <= this.maxPrice);
        }

        // Filtrar por descuento min
        if (this.minDiscount !== '') {
          filtered = filtered.filter(product => product.discountPercentage >= this.minDiscount);
        }
        
        // Filtrar por stock min
        if (this.minStock !== '') {
          filtered = filtered.filter(product => product.stock >= this.minStock);
        }

        // Filtrar por categoría
        if (this.selectedCategory !== '') {
          filtered = filtered.filter(product => product.category === this.selectedCategory);
        }
        
        // Filtrar por marca
        if (this.selectedBrand !== '') {
          filtered = filtered.filter(product => product.brand === this.selectedBrand);
        }

        // Filtrar por rate
        if (this.selectedRate !== '') {
          filtered = filtered.filter(product => product.rating >= this.selectedRate);
        }

        return filtered;
      },
      brands() {
        return [...new Set(this.products.map(product => product.brand))];
      }
    },
  };
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.filter-cont {
  display: flex;
  justify-content: space-evenly;
  margin: 5px;
}

</style>
<template>
    <div class="rating">
      <span v-for="n in maxStars" :key="n" v-bind:class="{ filled: n < this.rate }" >&#9733;</span>
      <span class="val">({{ rate }})</span>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      rate: {
        type: Number,
        required: true
      },
      maxStars: {
        type: Number,
        default: 5
      }
    }
  };
  </script>
  
  <style scoped>
  .rating {
    font-size: 20px;
  }
  .filled {
    color: gold;
  }
  .val {
    font-size: small;
    margin-left: 5px;
  }
  </style>
  
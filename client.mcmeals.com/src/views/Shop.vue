<template>
  <section class="shop">

    <section class="shop-header">
      <h1>ALL PRODUCTS</h1>
    </section>

    <ProductsList />

  </section>
</template>


<script>
import ProductsList from '@/components/ProductsList.vue';

export default {
  name: 'Shop',

  components: {
    ProductsList
  },
};
</script>

<style src="./Shop.css" scoped />
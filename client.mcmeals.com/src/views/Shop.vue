<template>
  <section class="shop">

    <section class="shop-header">
      <h1>All products</h1>
    </section>

    <section class="shop-products">
      <ProductsList />
    </section>

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
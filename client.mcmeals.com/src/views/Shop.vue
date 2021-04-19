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



<style scoped>
  .shop {
    padding: 40px;
  }

  .shop-header {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    padding-right: 20px;
    border-bottom: 1px solid var(--medium-grey);
    margin-bottom: 30px;
  }

  .shop-header h1 {
    font-size: 30px;
    text-transform: uppercase;
  }
</style>
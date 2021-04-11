<template>
  <div class="shop">
    <ProductsList />
  </div>
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
  padding: 10px;
}

.shop--title {
  color: black;
}

.shop h1 {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
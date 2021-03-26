<template>
  <div class="shop">
    <h1 class="shop--title">SHOP</h1>
    <MealsList />
  </div>
</template>



<script>
import MealsList from '@/components/MealsList.vue';

export default {
  name: 'Shop',
  components: {
    MealsList
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
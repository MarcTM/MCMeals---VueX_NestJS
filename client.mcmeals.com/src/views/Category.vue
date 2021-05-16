<template>
  <section class="category">

    <section v-if="category" class="category-image">
      <img v-bind:src="category.image" alt="category image" />
      <h1>{{category.name}}</h1>
    </section>

    <section v-if="category" class="category-products">
      <ProductsList v-bind:categoryId="category.id" />
    </section>

  </section>
</template>


<script>
import store from '@/store';
import ProductsList from '@/components/ProductsList.vue';
import { GET_CATEGORY } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default  {
  name: 'Category',

  components: {
    ProductsList
  },

  async beforeRouteEnter(to, from, next) {
    await store.dispatch(GET_CATEGORY, to.params.slug);
    next();
  },

  computed: {
      ...mapGetters(["category"]),
  },
};
</script>

<style src="./Category.css" scoped />
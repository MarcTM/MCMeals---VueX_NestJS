<template>
  <section class="category">

    <section v-if="category" class="category-image">
      <img v-bind:src="category.image" />
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
import { defineComponent } from 'vue';
import { GET_CATEGORY } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default  defineComponent({
  name: 'Category',

  components: {
    ProductsList
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch(GET_CATEGORY, to.params.slug);
    return next();
  },

  computed: {
      ...mapGetters(["category"]),
  },
});
</script>

<style src="./Category.css" scoped />
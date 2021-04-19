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



<style scoped>
  .category {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  .category-image {
    position: relative;
    text-align: center;
  }

  .category-image img {
    width: 100%;
    object-fit: cover;
    max-height: 500px;
    filter: brightness(50%);
  }

  .category-image h1 {
    color: white;
    font-weight: bold;
    font-size: 3em;
    text-transform: uppercase;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-name: category-title;
    animation-duration: 1s;
    animation-fill-mode: forwards;
  }

  .category-image h1::selection {
    background: var(--selection-color);
    color: black;
  }

  .category-products {
    padding: 40px;
  }
</style>
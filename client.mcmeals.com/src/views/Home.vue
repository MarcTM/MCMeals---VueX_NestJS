<template>
  <section class="home">

    <section v-if="categories" class="home-categories">
      <section v-for="category in categories"
      @click="getCategory(category.slug)"
      @mouseover="hoverCategory = category.id"
      @mouseleave="hoverCategory = false"
      class="home-category">
        <img class="home-category-image" v-bind:class="{ 'home-category-image-hover': hoverCategory && hoverCategory === category.id }" v-bind:src="category.image" alt="category image" />
        <p class="home-category-title" v-bind:class="{ 'home-category-title-hover': hoverCategory && hoverCategory === category.id }">{{category.name}}</p>
      </section>
    </section>

    <section v-if="most_visited" class="popular">
      <span class="popular-title">MOST POPULAR</span>
      <section class="popular-products">
        <ProductPreview v-for="product in most_visited" v-bind:product="product" />
      </section>
    </section>

  </section>
</template>



<script>
import { defineComponent } from 'vue';
import ProductPreview from '@/components/ProductPreview.vue';
import {
  GET_CATEGORIES,
  GET_MOST_VISITED
} from "@/store/actions.type";
import { mapGetters } from "vuex";

export default defineComponent({
  name: 'Home',

  data() {
    return {
      hoverCategory: false,
    };
  },

  components: {
    ProductPreview
  },

  mounted() {
      this.getCategories();
      this.getMostVisited();
  },

  computed: {
      ...mapGetters(["categories", "most_visited"]),
  },

  methods: {
      getCategories() {
          this.$store.dispatch(GET_CATEGORIES);
      },

      getMostVisited() {
        this.$store.dispatch(GET_MOST_VISITED);
      },

      getCategory(slug) {
        this.$router.push({ name: "Category", params: { slug: slug }});
      }
  },
});
</script>

<style src="./Home.css" scoped />
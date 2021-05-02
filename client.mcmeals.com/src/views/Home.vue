<template>
  <section class="home">

    <section v-if="categories" class="home-categories">
      <section
      v-for="category in categories"
      @click="getCategory(category.slug)"
      @mouseover="hoverCategory = category.id"
      @mouseleave="hoverCategory = false"
      class="home-category">
        <img class="home-category-image" v-bind:class="{ 'home-category-image-hover': hoverCategory && hoverCategory === category.id }" v-bind:src="category.image" alt="category image" />
        <p class="home-category-title" v-bind:class="{ 'home-category-title-hover': hoverCategory && hoverCategory === category.id }">{{category.name}}</p>
      </section>
    </section>

  </section>
</template>



<script>
import { defineComponent } from 'vue';
import { GET_CATEGORIES } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default defineComponent({
  name: 'Home',

  data() {
    return {
      hoverCategory: false,
    };
  },

  mounted() {
      this.getCategories()
  },

  computed: {
      ...mapGetters(["categories"]),
  },

  methods: {
      getCategories() {
          this.$store.dispatch(GET_CATEGORIES)
      },

      getCategory(slug) {
        this.$router.push({ name: "Category", params: { slug: slug }});
      }
  },
});
</script>

<style src="./Home.css" scoped />
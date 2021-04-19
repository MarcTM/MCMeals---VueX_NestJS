<template>
  <section class="home">

    <section v-if="categories" class="home-categories">
      <section
      v-for="category in categories"
      @click="getCategory(category.slug)"
      @mouseover="hoverCategory = category.id"
      @mouseleave="hoverCategory = false"
      class="home-category">
        <img class="home-category-image" v-bind:class="{ 'home-category-image-hover': hoverCategory && hoverCategory === category.id }" v-bind:src="category.image" alt="category-image" />
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



<style scoped>
  @keyframes category-title {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes category-image {
    0% {
      filter: brightness(90%);
    }
    100% {
      filter: brightness(50%);
    }
  }

  .home-categories {
    background-color: var(--color-background-secondary);
    padding: 60px 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 50px;
  }

  .home-category {
    position: relative;
  }

  .home-category-image {
    width: 100%;
    height: 220px;
    cursor: pointer;
  }

  .home-category-title {
    opacity: 0;
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    padding: 15px;
    background-color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 767px) {
    .home-categories {
      display: flex;
      flex-direction: column;
      padding: 40px 20px;
    }

    .home-category-image {
      filter: brightness(50%);
    }

    .home-category-title {
      opacity: 1;
    }
  }


  @media (min-width: 768px) {
    .home-category-image-hover {
      animation-name: category-image;
      animation-duration: 0.6s;
      animation-fill-mode: forwards;
    }

    .home-category-title-hover {
      animation-name: category-title;
      animation-duration: 0.8s;
      animation-fill-mode: forwards;
    }
  }
</style>
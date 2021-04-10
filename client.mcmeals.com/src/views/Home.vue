<template>
  <section class="home">

    <section v-if="categories" class="home-categories">
      <article
      v-for="category in categories"
      @click="getCategory(category.id)"
      @mouseover="hoverCategory = true"
      @mouseleave="hoverCategory = false"
      class="home-category">
        <img class="home-category-image" v-bind:src="category.image" alt="category-image" />
        <p v-if="hoverCategory" class="home-category-title">{{category.name}}</p>
      </article>
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

      getCategory(id) {
        console.log(id);
        // this.$router.push({ name: "Category", params: {id: id}});
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

  .home {
    width: 100%;
    text-align: center;
  }

  .home-categories {
    width: 100%;
    background-color: var(--color-background-secondary);
    box-sizing: border-box;
    padding: 40px 20px;

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  .home-category {
    position: relative;
    text-align: center;
  }

  .home-category-image {
    transition: 1s;
    width: 100%;
    cursor: pointer;
  }

  .home-category-image:hover {
    filter: brightness(50%);
  }

  .home-category-title {
    color: white;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    padding: 16px;
    background-color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-name: category-title;
    animation-duration: 1.5s;
  }
</style>
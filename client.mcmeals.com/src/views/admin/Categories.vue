<template>
  <section class="categories">

    <section class="categories-info">
      <section class="categories-columns">
        <h1>Slug</h1>
        <h1>Name</h1>
        <h1>Image</h1>
      </section>

      <section v-for="category in categories" class="categories-details">
        <h4>{{category.slug}}</h4>
        <h4>{{category.name}}</h4>
        <img v-bind:src="category.image" />
      </section>
    </section>

  </section>
</template>



<script>
import { defineComponent } from 'vue';
import { GET_CATEGORIES } from "@/store/actions.type";
import { mapGetters } from "vuex"

export default defineComponent({
  name: 'Categories',

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
  },
});
</script>



<style scoped>
  .categories {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .categories-info {
    width: 90%;
  }

  .categories-columns {
    width: 100%;
    font-size: 1.2em;
    background-color: var(--light-grey);
    text-transform: uppercase;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    padding: 10px 0px;
  }

  .categories-columns article {
    text-align: center;
  }

  .categories-details {
    cursor: pointer;
    width: 100%;
    padding: 30px 0px;
    text-align: center;
    display: grid;
    padding: auto;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    border-bottom: 1px solid var(--light-grey);
  }

  .categories-details:hover {
    background-color: var(--color-background-secondary);
  }

  .categories-details img {
    width: 50%;
  }

  .categories-details article {
    text-align: center;
  }
</style>
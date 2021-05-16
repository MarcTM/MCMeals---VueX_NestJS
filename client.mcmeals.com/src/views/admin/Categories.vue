<template>
  <section class="categories">

    <section class="categories-info">
      <section class="categories-columns">
        <h1>SLUG</h1>
        <h1>NAME</h1>
        <h1>IMAGE</h1>
      </section>

      <section @click="selectCategory(category.id)" v-for="category in categories" class="categories-details">
        <h4>{{category.slug}}</h4>
        <h4>{{category.name}}</h4>
        <img v-bind:src="category.image" alt="category image" />
      </section>
    </section>


    <section class="modal" v-bind:class="{ 'showed': openModal }">
      <section class="modal-content">
        <span @click="openModal = false" class="close">&times;</span>
        <section v-if="selected">
          <button @click="updateCategory(selected)" class="button">UPDATE</button>
          <button @click="deleteCategory(selected)" class="button">DELETE</button>
        </section>
      </section>
    </section>

  </section>
</template>


<script>
import { GET_CATEGORIES } from "@/store/actions.type";
import { mapGetters } from "vuex"

export default {
  name: 'Admin-Categories',

  data() {
    return {
      openModal: false,
      selected: false,
    }
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

      selectCategory(id) {
        this.openModal = true;
        this.selected = id;
      },

      updateCategory(id) {
      },

      deleteCategory(id) {
        this.$store.dispatch(DELETE_CATEGORY)
      },
  },
};
</script>

<style src="./Categories.css" scoped />
<template>
  <section class="subcategories">

    <section class="subcategories-info">
      <section class="subcategories-columns">
        <h1>SLUG</h1>
        <h1>NAME</h1>
        <h1>IMAGE</h1>
        <h1>CATEGORY</h1>
      </section>

      <section v-for="subcategory in subcategories" class="subcategories-details" @click="selectSubcategory(subcategory.id)">
        <h4>{{subcategory.slug}}</h4>
        <h4>{{subcategory.name}}</h4>
        <img v-bind:src="subcategory.image" alt="subcategory image" />
        <h4 v-if="subcategory.category">{{subcategory.category.name}}</h4>
        <h4 v-else>-</h4>
      </section>
    </section>


    <section class="modal" v-bind:class="{ 'showed': openModal }">
      <section class="modal-content">
        <span @click="openModal = false" class="close">&times;</span>
        <section v-if="selected">
          <button @click="updateSubcategory(selected)" class="button">UPDATE</button>
          <button @click="deleteSubcategory(selected)" class="button">DELETE</button>
        </section>
      </section>
    </section>

  </section>
</template>


<script>
import { GET_SUBCATEGORIES } from "@/store/actions.type";
import { mapGetters } from "vuex"

export default {
  name: 'Admin-Subategories',

  data() {
    return {
      openModal: false,
      selected: false,
    }
  },

  mounted() {
      this.getSubcategories()
  },

  computed: {
      ...mapGetters(["subcategories"]),
  },

  methods: {
      getSubcategories() {
          this.$store.dispatch(GET_SUBCATEGORIES)
      },

      selectSubcategory(id) {
        this.openModal = true;
        this.selected = id;
      },

      updateSubcategory(id) {
      },

      deleteSubcategory(id) {
        this.$store.dispatch(DELETE_SUBCATEGORY)
      },
  },
};
</script>

<style src="./Subcategories.css" scoped />
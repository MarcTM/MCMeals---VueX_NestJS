<template>
  <section class="products">

    <section class="products-info">
      <section class="products-columns">
        <h1>SLUG</h1>
        <h1>NAME</h1>
        <h1>IMAGE</h1>
      </section>

      <section @click="selectProduct(product.id)" v-for="product in products" class="products-details">
        <h4>{{product.slug}}</h4>
        <h4>{{product.name}}</h4>
        <img v-bind:src="product.image" alt="product image" />
      </section>
    </section>


    <section class="modal" v-bind:class="{ 'showed': openModal }">
      <section class="modal-content">
        <span @click="openModal = false" class="close">&times;</span>
        <section v-if="selected">
          <button @click="updateProduct(selected)" class="button">UPDATE</button>
          <button @click="deleteProduct(selected)" class="button">DELETE</button>
        </section>
      </section>
    </section>

  </section>
</template>


<script>
import {
  GET_PRODUCTS,
  DELETE_PRODUCT
} from "@/store/actions.type";
import { mapGetters } from "vuex"

export default {
  name: 'Admin-Products',

  data() {
    return {
      openModal: false,
      selected: false,
    }
  },

  mounted() {
      this.getProducts()
  },

  computed: {
      ...mapGetters(["products"]),
  },

  methods: {
      getProducts() {
          this.$store.dispatch(GET_PRODUCTS)
      },

      selectProduct(id) {
        this.openModal = true;
        this.selected = id;
      },

      updateProduct(id) {

      },

      deleteProduct(id) {
        this.$store.dispatch(DELETE_PRODUCT)
      },
  },
};
</script>

<style src="./Products.css" scoped />
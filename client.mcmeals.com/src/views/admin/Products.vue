<template>
  <section class="products">

    <section class="products-info">
      <section class="products-columns">
        <h1>Slug</h1>
        <h1>Name</h1>
        <h1>Image</h1>
      </section>

      <section @click="selectProduct(product.id)" v-for="product in products" class="products-details">
        <h4>{{product.slug}}</h4>
        <h4>{{product.name}}</h4>
        <img v-bind:src="product.image" />
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
import { defineComponent } from 'vue';
import {
  GET_PRODUCTS,
  DELETE_PRODUCT
} from "@/store/actions.type";
import { mapGetters } from "vuex"

export default defineComponent({
  name: 'Products',

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
});
</script>



<style scoped>
  .products {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .products-info {
    width: 90%;
  }

  .products-columns {
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

  .products-columns article {
    text-align: center;
  }

  .products-details {
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

  .products-details:hover {
    background-color: var(--color-background-secondary);
  }

  .products-details img {
    width: 50%;
  }

  .products-details article {
    text-align: center;
  }


    /* Modal */
  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.4);
  }

  .showed {
    display: block;
  }

  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 50%; 
  }

  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  .button {
    padding: 20px;
    background-color: white;
    border: 2px solid black;
    color: black;
    font-weight: bold;
    margin: 20px;
    cursor: pointer;
    transition: 0.2s;
  }

  .button:hover {
    background-color: var(--color-hover-light);
  }
</style>
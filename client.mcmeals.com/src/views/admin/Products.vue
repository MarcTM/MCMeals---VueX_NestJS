<template>
  <section class="products">

    <section class="products-info">
      <section class="products-columns">
        <h1>Slug</h1>
        <h1>Name</h1>
        <h1>Image</h1>
      </section>

      <section v-for="product in products" class="products-details">
        <h4>{{product.slug}}</h4>
        <h4>{{product.name}}</h4>
        <img v-bind:src="product.image" />
      </section>
    </section>

  </section>
</template>



<script>
import { defineComponent } from 'vue';
import { GET_PRODUCTS } from "@/store/actions.type";
import { mapGetters } from "vuex"

export default defineComponent({
  name: 'Products',

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
</style>
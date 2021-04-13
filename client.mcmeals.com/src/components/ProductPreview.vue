<template>

  <section @click="details(product.slug)" class="product-preview">
    <img v-bind:src="product.image" />
    <p>{{ product.name }}</p>
    <label>{{ product.price }} €</label>
  </section>

</template>



<script>
import {
    ADD_CART
} from "@/store/actions.type";

export default {
    name: 'ProductPreview',

    props: ['product'],

    methods: {
      details(slug) {
        this.$router.push({ name: "Product", params: { slug }});
      },
    }
}
</script>



<style scoped>
  .product-preview {
    cursor: pointer;
    color: black;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .product-preview p {
    color: #3a3a3a;
    font-size: 1.2em;
    margin-bottom: 8px;
  }

  .product-preview label {
    font-weight: bold;
  }

  .product-preview img {
    width: 90%;
    height: 200px;
  }
</style>
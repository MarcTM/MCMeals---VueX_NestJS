<template>

  <section @click="details(product.slug)" class="product-preview">
    <img v-bind:src="product.image" class="image" />
    <p class="title">{{ product.name }}</p>
    <span class="money">{{ product.price }} €</span>
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .image {
    width: 85%;
    height: 200px;
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 17px;
    margin-bottom: 10px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .money {
    width: 100%;
    text-align: center;
    font-size: 17px;
  }
</style>